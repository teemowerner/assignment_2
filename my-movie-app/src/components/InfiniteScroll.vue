<template>
  <div class="infinite-scroll">
    <div
      v-for="movie in movies.filter((movie) => movie.poster_path)" 
      :key="movie.id" 
      class="movie-item"
    >
      <img 
        :src="getPosterUrl(movie.poster_path)" 
        :alt="movie.title" 
      />
      <h3>{{ movie.title }}</h3>
    </div>
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
export default {
  name: "InfiniteScroll",
  props: ["apiEndpoint"],
  data() {
    return {
      movies: [], // 불러온 영화 데이터를 저장
      page: 1, // 현재 페이지 번호
      loading: false, // 로딩 상태
      allMoviesFetched: false, // 모든 영화 데이터를 가져왔는지 여부
    };
  },
  methods: {
    async fetchMovies() {
      if (this.loading || this.allMoviesFetched) return; // 이미 로딩 중이거나 모든 데이터를 가져온 경우 중단
      this.loading = true;
      try {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const BASE_URL = "https://api.themoviedb.org/3";
        const response = await fetch(
          `${BASE_URL}/${this.apiEndpoint}?api_key=${API_KEY}&page=${this.page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          this.movies.push(...data.results); // 기존 데이터에 새로운 데이터를 추가
          this.page++; // 다음 페이지로 이동
        } else {
          this.allMoviesFetched = true; // 더 이상 가져올 데이터가 없음을 표시
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false; // 로딩 상태 종료
      }
    },
    getPosterUrl(path) {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : "/path/to/placeholder-image.jpg"; // 기본 이미지 경로 설정
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // 스크롤이 끝에 도달하면 새로운 데이터를 가져옴
      if (scrollPosition >= documentHeight - 100) {
        this.fetchMovies();
      }
    },
  },
  mounted() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 리스너 추가
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // 컴포넌트가 언마운트되면 이벤트 리스너 제거
  },
};
</script>

<style scoped>
.infinite-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px;
}
.movie-item {
  width: 200px;
  text-align: center;
}
.movie-item img {
  width: 100%;
  border-radius: 8px;
}
.loading {
  text-align: center;
  font-size: 18px;
  color: white;
  margin-top: 20px;
}
</style>

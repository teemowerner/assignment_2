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
      movies: [],
      page: 1,
      loading: false,
    };
  },
  methods: {
    async fetchMovies() {
      if (this.loading) return;
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
        if (data.results) {
          this.movies.push(...data.results); // 기존 데이터에 추가
          this.page++;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    getPosterUrl(path) {
      if (!path) {
        return "/path/to/placeholder-image.jpg"; // 기본 이미지 경로 설정
      }
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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

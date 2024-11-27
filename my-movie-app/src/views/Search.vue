<template>
  <div class="search-container">
    <h1>영화 검색</h1>

    <!-- 검색 입력 필드 -->
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="applyFilters"
        placeholder="영화 제목을 입력하세요"
      />
    </div>

    <!-- 필터 섹션 -->
    <div class="filter-container">
      <!-- 장르 필터 -->
      <select v-model="selectedGenre" @change="applyFilters">
        <option value="">장르 (전체)</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <!-- 평점 필터 -->
      <select v-model="selectedRating" @change="applyFilters">
        <option value="">평점 (전체)</option>
        <option v-for="rating in ratings" :key="rating" :value="rating">
          {{ rating }}
        </option>
      </select>

      <!-- 언어 필터 -->
      <select v-model="selectedLanguage" @change="applyFilters">
        <option value="">언어 (전체)</option>
        <option v-for="language in languages" :key="language.code" :value="language.code">
          {{ language.name }}
        </option>
      </select>

      <!-- 초기화 버튼 -->
      <button @click="resetFilters">초기화</button>
    </div>

    <!-- 영화 목록 -->
    <MovieList :movies="filteredMovies" />

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "Search",
  components: { MovieList },
  data() {
    return {
      query: "", // 영화 제목 검색어
      movies: [], // 전체 영화 데이터
      filteredMovies: [], // 필터링된 영화 데이터
      selectedGenre: "",
      selectedRating: "",
      selectedLanguage: "",
      page: 1, // 페이지 번호
      loading: false, // 로딩 상태
      allMoviesFetched: false, // 모든 데이터를 가져왔는지 여부
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 10751, name: "Family" },
      ],
      ratings: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      languages: [
        { code: "en", name: "English" },
        { code: "ko", name: "Korean" },
        { code: "fr", name: "French" },
        { code: "ja", name: "Japanese" },
      ],
    };
  },
  methods: {
    async fetchMovies() {
      // TMDB API 호출 (페이지별로 영화 데이터 가져오기)
      if (this.loading || this.allMoviesFetched) return; // 이미 로딩 중이거나 모든 데이터를 가져왔으면 중단
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${this.page}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          this.movies.push(...data.results); // 새로운 데이터를 기존 데이터에 추가
          this.filteredMovies = this.movies; // 필터링 데이터 업데이트
          this.page++; // 페이지 번호 증가
        } else {
          this.allMoviesFetched = true; // 더 이상 가져올 데이터가 없음을 표시
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false; // 로딩 상태 종료
      }
    },
    applyFilters() {
      // 필터링된 영화 목록 생성
      this.filteredMovies = this.movies.filter((movie) => {
        const matchQuery =
          this.query === "" ||
          movie.title.toLowerCase().includes(this.query.toLowerCase());
        const matchGenre =
          this.selectedGenre === "" || movie.genre_ids.includes(Number(this.selectedGenre));
        const matchRating =
          this.selectedRating === "" || Math.round(movie.vote_average) === Number(this.selectedRating);
        const matchLanguage =
          this.selectedLanguage === "" || movie.original_language === this.selectedLanguage;

        return matchQuery && matchGenre && matchRating && matchLanguage;
      });
    },
    resetFilters() {
      // 필터 초기화
      this.query = "";
      this.selectedGenre = "";
      this.selectedRating = "";
      this.selectedLanguage = "";
      this.filteredMovies = this.movies; // 전체 영화 데이터로 초기화
    },
    handleScroll() {
      // 스크롤 이벤트 처리
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 100) {
        this.fetchMovies();
      }
    },
  },
  mounted() {
    this.fetchMovies(); // 초기 영화 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 추가
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
  },
};
</script>

<style scoped>
/* 검색 입력 필드 스타일 */
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

/* 필터 스타일 */
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

select,
button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

button {
  background-color: black;
  color: white;
  font-weight: bold;
}

select:focus,
button:focus,
input:focus {
  outline: none;
  border-color: #007bff;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: black;
  margin-top: 20px;
}
</style>

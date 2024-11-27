<template>
  <div class="search-container">
    <h1>영화 검색</h1>

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
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "Search",
  components: { MovieList },
  data() {
    return {
      query: "",
      movies: [], // 전체 영화 데이터
      filteredMovies: [], // 필터링된 영화 데이터
      selectedGenre: "",
      selectedRating: "",
      selectedLanguage: "",
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
      // TMDB API 호출 (기존 영화 데이터 가져오기)
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        this.movies = data.results;
        this.filteredMovies = data.results; // 초기값 설정
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    applyFilters() {
      // 필터링된 영화 목록 생성
      this.filteredMovies = this.movies.filter((movie) => {
        const matchGenre =
          this.selectedGenre === "" || movie.genre_ids.includes(Number(this.selectedGenre));
        const matchRating =
          this.selectedRating === "" || Math.round(movie.vote_average) === Number(this.selectedRating);
        const matchLanguage =
          this.selectedLanguage === "" || movie.original_language === this.selectedLanguage;

        return matchGenre && matchRating && matchLanguage;
      });
    },
    resetFilters() {
      // 필터 초기화
      this.selectedGenre = "";
      this.selectedRating = "";
      this.selectedLanguage = "";
      this.filteredMovies = this.movies; // 전체 영화 데이터로 초기화
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
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
button:focus {
  outline: none;
  border-color: #007bff;
}
</style>

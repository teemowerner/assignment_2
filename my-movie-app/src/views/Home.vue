<template>
  <div>
    <h1>홈 페이지</h1>
    <!-- 인기 영화 섹션 -->
    <MovieList title="인기 영화" :movies="popularMovies" />
    <!-- 최신 영화 섹션 -->
    <MovieList title="최신 영화" :movies="nowPlayingMovies" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "Home",
  components: { MovieList },
  data() {
    return {
      popularMovies: [], // 인기 영화 데이터
      nowPlayingMovies: [], // 최신 영화 데이터
    };
  },
  methods: {
    async fetchMovies(apiEndpoint, pages = 5) {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const BASE_URL = "https://api.themoviedb.org/3";
      const movies = [];
      try {
        for (let page = 1; page <= pages; page++) {
          const response = await fetch(
            `${BASE_URL}/${apiEndpoint}?api_key=${API_KEY}&page=${page}`
          );
          const data = await response.json();
          if (data.results) {
            movies.push(...data.results); // 새로운 데이터를 추가
          }
        }
      } catch (error) {
        console.error(`Error fetching ${apiEndpoint} movies:`, error);
      }
      return movies.filter((movie) => movie.poster_path); // 포스터가 있는 영화만 반환
    },
    async loadMovies() {
      this.popularMovies = await this.fetchMovies("movie/popular", 5); // 인기 영화 5페이지
      this.nowPlayingMovies = await this.fetchMovies("movie/now_playing", 3); // 최신 영화 3페이지
    },
  },
  mounted() {
    this.loadMovies(); // 영화 데이터 로드
  },
};
</script>

<style scoped>
/* 페이지 스타일링 */
h1 {
  text-align: center;
  color: white;
}
</style>

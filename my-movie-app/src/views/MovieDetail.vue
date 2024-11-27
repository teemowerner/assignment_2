<template>
  <div class="movie-detail">
    <!-- 영화 포스터 -->
    <img :src="posterUrl" alt="Movie Poster" />
    <!-- 영화 제목 -->
    <h1>{{ movie.title }}</h1>
    <!-- 개봉일 -->
    <p><strong>개봉일:</strong> {{ movie.release_date }}</p>
    <!-- 장르 -->
    <p>
      <strong>장르:</strong>
      <span v-for="(genre, index) in movie.genres" :key="genre.id">
        {{ genre.name }}<span v-if="index < movie.genres.length - 1">, </span>
      </span>
    </p>
    <!-- 상영 시간 -->
    <p><strong>상영 시간:</strong> {{ movie.runtime }}분</p>
    <!-- 줄거리 -->
    <p><strong>줄거리:</strong> {{ movie.overview }}</p>
    <!-- 평점 -->
    <p><strong>평점:</strong> ⭐ {{ movie.vote_average }} / 10</p>
    <!-- 제작사 -->
    <div v-if="movie.production_companies.length">
      <strong>제작사:</strong>
      <ul>
        <li v-for="company in movie.production_companies" :key="company.id">
          {{ company.name }}
        </li>
      </ul>
    </div>
    <!-- 예고편 (YouTube 링크) -->
    <div v-if="trailerUrl">
      <a :href="trailerUrl" target="_blank" class="trailer-link">예고편 보기</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieDetail",
  data() {
    return {
      movie: {}, // 영화 데이터
      posterUrl: "", // 포스터 URL
      trailerUrl: "", // 예고편 URL
    };
  },
  async created() {
    const movieId = this.$route.params.id; // URL에서 영화 ID 가져오기
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    try {
      // 영화 상세 정보 가져오기
      const movieResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY, language: "ko-KR" },
      });
      this.movie = movieResponse.data;
      this.posterUrl = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;

      // 예고편 가져오기
      const trailerResponse = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: { api_key: API_KEY, language: "en-US" },
      });
      const trailer = trailerResponse.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  },
};
</script>

<style scoped>
.movie-detail {
  text-align: center;
  color: white;
  padding: 20px;
}
.movie-detail img {
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.trailer-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff3d00;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
.trailer-link:hover {
  background-color: #ff5722;
}
</style>

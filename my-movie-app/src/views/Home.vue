<template>
  <div>
    <h1>홈 페이지</h1>
    <MovieList title="인기 영화" :movies="popularMovies" />
    <MovieList title="최신 영화" :movies="nowPlayingMovies" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { searchMoviesAPI } from "@/services/api";

export default {
  name: "Home",
  components: { MovieList },
  data() {
    return {
      popularMovies: [],
      nowPlayingMovies: [],
    };
  },
  async created() {
    // API 호출하여 데이터를 가져옵니다.
    this.popularMovies = await searchMoviesAPI("popular");
    this.nowPlayingMovies = await searchMoviesAPI("now_playing");
  },
};
</script>

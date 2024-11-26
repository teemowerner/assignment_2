<template>
  <div>
    <h1>영화 검색</h1>
    <input v-model="query" @input="searchMovies" placeholder="영화를 검색하세요" />
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { searchMoviesAPI } from "@/services/api";

export default {
  name: "Search",
  components: { MovieList },
  data() {
    return {
      query: "",
      movies: [],
    };
  },
  methods: {
    async searchMovies() {
      if (this.query) {
        this.movies = await searchMoviesAPI(this.query);
      }
    },
  },
};
</script>

<template>
  <div class="movie-detail">
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" />
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
import { fetchMovieDetails } from '@/services/api';

export default {
  data() {
    return { movie: {} };
  },
  async created() {
    const id = this.$route.params.id;
    this.movie = await fetchMovieDetails(id);
  },
};
</script>

<style>
.movie-detail img {
  width: 300px;
  margin-bottom: 20px;
}
</style>

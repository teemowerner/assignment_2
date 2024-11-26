<template>
  <div class="movie-card">
    <img :src="posterUrl" :alt="movie.title" />
    <h3>{{ movie.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
    },
  },
};
</script>

<style>
.movie-card {
  width: 150px;
  text-align: center;
  margin: 10px;
}
.movie-card img {
  width: 100%;
  border-radius: 8px;
}
</style>

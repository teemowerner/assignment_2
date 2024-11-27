<template>
  <div class="movie-list">
    <h2>{{ title }}</h2>
    <div class="movie-grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";

export default {
  name: "MovieList",
  components: { MovieCard },
  props: ["title", "movies"],
};
</script>

<style scoped>
.movie-list {
  margin: 20px 0;
}
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

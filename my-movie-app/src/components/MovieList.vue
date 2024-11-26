<template>
  <div class="movie-list">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="movie-item"
      @click="$router.push(`/movie/${movie.id}`)"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        :alt="movie.title"
      />
      <h3>{{ movie.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.movie-item {
  cursor: pointer;
  text-align: center;
  width: 150px;
}
.movie-item img {
  width: 100%;
  border-radius: 8px;
}
</style>

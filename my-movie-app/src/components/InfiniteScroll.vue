<template>
  <div>
    <div v-for="movie in movies" :key="movie.id" class="movie-item">
      <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
      <h3>{{ movie.title }}</h3>
    </div>
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
export default {
  name: "InfiniteScroll",
  props: ["apiEndpoint"],
  data() {
    return {
      movies: [],
      page: 1,
      loading: false,
    };
  },
  methods: {
    async fetchMovies() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${this.apiEndpoint}?api_key=YOUR_API_KEY&page=${this.page}`
        );
        const data = await response.json();
        this.movies.push(...data.results);
        this.page++;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

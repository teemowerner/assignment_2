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
          `https://api.themoviedb.org/3/${this.apiEndpoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${this.page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.results) {
          throw new Error("No results found in the API response.");
        }
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

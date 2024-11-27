<template>
  <!-- 포스터가 없는 경우 렌더링하지 않음 -->
  <div v-if="movie.poster_path" class="movie-card">
    <!-- 포스터 클릭 시 상세 페이지로 이동 -->
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      :alt="movie.title"
      @click="goToDetails"
      class="movie-poster"
    />
    <!-- 영화 제목 -->
    <h3>{{ movie.title }}</h3>
    <!-- 찜 버튼 -->
    <button class="favorite-btn" @click.stop="toggleFavorite">
      {{ isFavorite ? "찜 취소" : "찜하기" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["movie"],
  data() {
    return {
      isFavorite: false,
    };
  },
  mounted() {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.isFavorite = savedFavorites.some((fav) => fav.id === this.movie.id);
  },
  methods: {
    toggleFavorite() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (this.isFavorite) {
        const updatedFavorites = favorites.filter((fav) => fav.id !== this.movie.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        favorites.push(this.movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      this.isFavorite = !this.isFavorite;
      window.dispatchEvent(new Event("wishlist-updated"));
    },
    goToDetails() {
      // 영화 상세 페이지로 이동
      this.$router.push({ name: "MovieDetail", params: { id: this.movie.id } });
    },
  },
};
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 200px;
  margin: 10px;
  text-align: center;
}
.movie-card img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}
.favorite-btn {
  position: absolute;
  top: -20px;
  right: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>

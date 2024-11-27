<template>
  <div class="movie-card">
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" />
    <h3>{{ movie.title }}</h3>
    <!-- 하트 아이콘 -->
    <button class="favorite-btn" @click="toggleFavorite">
      <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
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
    // Local Storage에서 초기 상태 확인
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.isFavorite = savedFavorites.some((fav) => fav.id === this.movie.id);
  },
  methods: {
    toggleFavorite() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (this.isFavorite) {
        // 이미 찜한 경우 제거
        const updatedFavorites = favorites.filter((fav) => fav.id !== this.movie.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        // 찜하지 않은 경우 추가
        favorites.push(this.movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      this.isFavorite = !this.isFavorite; // 상태 업데이트
    },
  },
};
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 200px;
  margin: 10px;
}
.movie-card img {
  width: 100%;
  border-radius: 8px;
}
.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
}
.favorite-btn .fas {
  color: red;
}
.favorite-btn .far {
  color: gray;
}
</style>

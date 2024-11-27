<template>
  <div>
    <h1>내가 찜한 리스트</h1>
    <!-- 찜한 영화가 없을 때 -->
    <div v-if="wishlist.length === 0">찜한 영화가 없습니다.</div>
    <!-- 찜한 영화가 있을 때 -->
    <MovieList v-else :movies="wishlist" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "Wishlist",
  components: { MovieList },
  data() {
    return {
      wishlist: [],
    };
  },
  methods: {
    updateWishlist() {
      // Local Storage에서 최신 데이터를 가져와 반영
      this.wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
    },
  },
  mounted() {
    // 페이지가 로드되었을 때 Local Storage 데이터를 동기화
    this.updateWishlist();
    // 다른 컴포넌트에서 "wishlist-updated" 이벤트를 받아 업데이트
    window.addEventListener("wishlist-updated", this.updateWishlist);
  },
  beforeUnmount() {
    // 이벤트 리스너 해제
    window.removeEventListener("wishlist-updated", this.updateWishlist);
  },
};
</script>


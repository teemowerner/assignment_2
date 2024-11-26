<template>
  <div>
    <h1>내가 찜한 리스트</h1>
    <MovieList :movies="wishlist" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "Wishlist",
  components: { MovieList },
  data() {
    return {
      wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    };
  },
};
</script>

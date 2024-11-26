<template>
  <div>
    <h1>대세 콘텐츠</h1>
    <InfiniteScroll apiEndpoint="movie/popular" />
  </div>
</template>

<script>
import InfiniteScroll from "@/components/InfiniteScroll.vue";

export default {
  name: "Popular",
  components: { InfiniteScroll },
};
</script>

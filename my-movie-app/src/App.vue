<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
/* 전체 스타일은 여기에 추가 */
body {
  background-color: #121212; /* 원하는 배경색 */
  color: white; /* 텍스트를 하얀색으로 */
  margin: 0;
  font-family: Arial, sans-serif;
}

</style>

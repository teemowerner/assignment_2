<template>
  <div id="app">
    <MovieList />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue';

export default {
  name: 'App',
  components: {
    MovieList,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #000;
  color: white;
}
</style>

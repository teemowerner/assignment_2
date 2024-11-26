<template>
  <div class="movie-list">
    <!-- 인기 영화 -->
    <h2>Your Next Watch</h2>
    <div class="movie-scroll-wrapper">
      <button class="scroll-button" @click="scrollLeft('popular')">←</button>
      <div ref="popularContainer" class="scroll-container">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-item">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
          />
          <div v-if="movie.popularity > 100" class="tag">Top 10</div>
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
      <button class="scroll-button" @click="scrollRight('popular')">→</button>
    </div>

    <!-- 최신 영화 -->
    <h2>Latest Movies</h2>
    <div class="movie-scroll-wrapper">
      <button class="scroll-button" @click="scrollLeft('latest')">←</button>
      <div ref="latestContainer" class="scroll-container">
        <div v-for="movie in nowPlayingMovies" :key="movie.id" class="movie-item">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
          />
          <div v-if="movie.release_date" class="tag">Recently Added</div>
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
      <button class="scroll-button" @click="scrollRight('latest')">→</button>
    </div>
  </div>
</template>

<script>
import { fetchPopularMovies, fetchNowPlayingMovies } from '@/services/api';

export default {
  name: 'MovieList',
  data() {
    return {
      popularMovies: [], // 인기 영화
      nowPlayingMovies: [], // 최신 영화
    };
  },
  async created() {
    // API에서 영화 데이터 가져오기
    this.popularMovies = await fetchPopularMovies();
    this.nowPlayingMovies = await fetchNowPlayingMovies();
  },
  methods: {
    scrollLeft(section) {
      const container =
        section === 'popular'
          ? this.$refs.popularContainer
          : this.$refs.latestContainer;
      container.scrollBy({ left: -300, behavior: 'smooth' });
    },
    scrollRight(section) {
      const container =
        section === 'popular'
          ? this.$refs.popularContainer
          : this.$refs.latestContainer;
      container.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
};
</script>

<style>
.movie-list {
  color: white;
  padding: 20px;
  background-color: #111;
}
.movie-list h2 {
  margin-bottom: 20px;
}

.movie-scroll-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  flex-grow: 1;
}

.scroll-button {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  transition: 0.2s;
  z-index: 10;
}
.scroll-button:hover {
  background: rgba(0, 0, 0, 0.9);
}

.movie-item {
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  position: relative;
}
.movie-item img {
  width: 100%;
  border-radius: 8px;
}
.movie-item h3 {
  font-size: 14px;
  margin-top: 5px;
}

/* 배너 스타일 */
.tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px;
  font-size: 10px;
  border-radius: 4px;
}
</style>

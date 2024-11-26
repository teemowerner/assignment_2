import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 인기 영화 목록 가져오기
export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: 'en-US', page: 1 },
  });
  return response.data.results;
};

// "Now Playing" 최신 영화 목록 가져오기
export const fetchNowPlayingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: { api_key: API_KEY, language: 'en-US', page: 1 },
    });
    return response.data.results;
  };
  
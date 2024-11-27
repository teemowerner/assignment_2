import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist', // 빌드 결과물이 저장될 디렉터리
    assetsDir: 'assets', // 정적 파일이 저장될 하위 디렉터리
    emptyOutDir: true, // 기존 빌드 파일 제거
  },
});

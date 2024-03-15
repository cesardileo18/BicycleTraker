import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://cesardileo18.github.io/BicycleTraker",
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      }
    }
  }
})

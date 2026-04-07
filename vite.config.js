import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // режим сборки 'production' или 'developer'
  const isProd = mode === 'production';

  return {
    base: isProd ? '/Todo-List/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'https://agasobanuye.netlify.app',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['events', 'fs', 'buffer'], // Exclude problematic modules
  },
})

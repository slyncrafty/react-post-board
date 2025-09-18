import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:2121'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      proxy: {
        '/api/auth': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/api/posts': {
          target: backendUrl,
          changeOrigin: true,
        },
      }
    },
  }
})
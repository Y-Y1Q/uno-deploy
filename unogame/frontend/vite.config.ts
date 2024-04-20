import { defineConfig } from "vite"

export default defineConfig({
    server: {
      proxy: {
        //  from FE localhost: /api/something-> http://localhost:3333/something
        '/api': {
          target: 'http://localhost:3333',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  })

import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  server: {
    proxy: {
      //  proxy configuration for redirecting requests to the backend
      //  from FE localhost: /api/something-> http://localhost:3333/something
      "/api": {
        target: "http://localhost:3333",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

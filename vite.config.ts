import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    proxy: {
      // Proxy all requests starting with /api → http://localhost:8080
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // if your Spring endpoints do NOT include the /api prefix,
        // uncomment the next line to strip it off:
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

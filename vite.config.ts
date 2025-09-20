import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Development-only component tagger removed. Keeping a placeholder here in case
// you want to re-enable component tagging later.

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/portfolio-hub/' : '/',
  server: {
    host: "::",
    port: 8080,
  },  plugins: [
    react(),
    // componentTagger removed. To re-enable, import it and add here for dev only.
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    host: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',
  },
});

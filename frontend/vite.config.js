import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/assets/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/assets/pages', import.meta.url)),
      '@redux': fileURLToPath(new URL('./src/redux', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://5d55bd72-55b9-4785-8f11-e06014ee8714-dev.e1-us-cdp-2.choreoapis.dev/rmmd/spotifymoodbackend/now-popular-service-e9d/v1.0',
        changeOrigin: true, // Needed for name based virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // 🚨 CRITICAL FIX: Proxies requests from 5173/api/products to 5000/api/products
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ensure this matches your backend port
        changeOrigin: true,
      },
    },
  },
});
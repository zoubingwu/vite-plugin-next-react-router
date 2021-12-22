import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import { reactRouterPlugin } from 'vite-plugin-next-react-router';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactRouterPlugin({
      async: true,
    }),
  ],
});

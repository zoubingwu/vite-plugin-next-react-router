import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { reactRouterPlugin } from 'vite-plugin-react-router';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactRouterPlugin()],
});

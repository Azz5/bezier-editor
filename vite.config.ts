import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  base: '/bezier-editor',
  plugins: [react()],
  resolve: {
    alias: {
      // When you `import p5 from 'p5'`, use the ESM build instead of UMD
      'p5$': path.resolve(__dirname, 'node_modules/p5/lib/p5.min.js'),
    },
  },
  optimizeDeps: {
    include: ['p5'], // pre-bundle p5 in dev as ESM
  },
  build: {
    // you can remove all of your commonjsOptions: { ... } overrides
  },
})

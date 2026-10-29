import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

// base: './' keeps asset paths relative so the built site works when served from a
// subpath (GitHub Pages project site, S3 prefix) as well as from a domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
});
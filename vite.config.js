import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        site: resolve(process.cwd(), 'site.html'),
      },
    },
  },
})

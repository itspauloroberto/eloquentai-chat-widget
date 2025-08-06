import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/demo',
  build: {
    outDir: '../../dist-demo',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  }
})

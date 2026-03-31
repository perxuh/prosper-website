import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold slightly — GSAP + Framer Motion are legitimately large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate cached chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap-vendor': ['gsap'],
          'framer-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot'],
        },
      },
    },
  },
})

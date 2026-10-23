import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative assets support Render and GitHub Pages project paths.
  base: './',
  build: {
    // Keep the optional renderer independently cacheable from the HTML UI.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three-core', test: /three[\\/]build[\\/]three\.core\.js/, priority: 30 },
            { name: 'three-renderer', test: /three[\\/]build[\\/]three\.module\.js/, priority: 20 },
            { name: 'scroll-timeline', test: /node_modules[\\/]gsap[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
})

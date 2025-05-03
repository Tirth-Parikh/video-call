// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: '8888',  // Allow external access
    port: 5173,        // Use the port you want
  }
})
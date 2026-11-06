import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O navegador chama /hello/... na própria origem do Vite (5173) e o proxy
// repassa para a API Spring Boot. Assim não é preciso configurar CORS no backend.
const api = {
  '/hello': { target: 'http://localhost:8080', changeOrigin: true },
  '/hello2': { target: 'http://localhost:8080', changeOrigin: true },
}

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: api },
  preview: { port: 4173, proxy: api },
})

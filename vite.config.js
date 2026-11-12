import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// The same security headers Vercel serves, applied to `vite preview` so they can be tested locally.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const headers = Object.fromEntries(vercel.headers[0].headers.map((h) => [h.key, h.value]))

// SINGLEFILE=1 bundles everything into one HTML file for sharing a quick preview.
export default defineConfig({
  plugins: [react(), tailwindcss(), ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])],
  preview: { headers },
})

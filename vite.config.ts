import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { resolve } from "path"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    minify: true,
    outDir: resolve(__dirname, "dist/ui"),
  },
})

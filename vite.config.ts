/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail loudly if 5173 is taken instead of silently hopping to 5174/5175,
    // which leaves already-open tabs pointed at a dead port (blank page on refresh).
    strictPort: true,
  },
  // Vitest: fast, headless unit/component tests (jsdom). Playwright E2E comes later.
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    base: '/bgc/',
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
        host: '0.0.0.0',
    },
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    publicDir: 'public',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests',
        mockReset: true,
    },
})

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        allowedHosts: true // This allows any host, including dynamic ngrok URLs
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
                additionalData: `
                @use '/src/styles/variables.scss' as *;
                `
            }
        }
    }
});
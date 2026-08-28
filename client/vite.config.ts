import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, pathToFileURL } from 'node:url';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': srcDir
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                importers: [{
                    findFileUrl(url) {
                        if (!url.startsWith('@/')) return null;
                        return new URL(url.replace('@/', pathToFileURL(srcDir + '/').href));
                    }
                }]
            }
        }
    }
})

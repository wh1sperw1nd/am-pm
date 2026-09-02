import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';

const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

function initialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<Theme>(initialTheme());

    watchEffect(() => {
        document.documentElement.classList.toggle('dark', theme.value === 'dark');
        localStorage.setItem(STORAGE_KEY, theme.value);
    });

    function toggle() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
    }

    return { theme, toggle };
});

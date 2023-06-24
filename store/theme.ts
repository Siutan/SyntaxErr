import { defineStore } from 'pinia'

export const THEMES = {
    DARK: 'forest',
    LIGHT: 'light',
}

export const useThemeStore = defineStore('theme', () => {

    const theme = reactive({ dark: true })

    function toggle() {
        theme.dark = !theme.dark
    }

    return { theme, toggle }
})
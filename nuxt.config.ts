export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            unsplashKey: process.env.UNSPLASH_KEY,
        }
    },
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        '@pinia/nuxt'
    ],
    // @ts-ignore
    css: ['~/public/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
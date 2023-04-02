// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from 'vite-plugin-pwa'
export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode', '@vite-pwa/nuxt'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: "Yaprof",
            htmlAttrs: {
                lang: "fr",
            },
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "description", name: "description", content: "L'application préférée des étudiants - Vous pourrez savoir si vos profs sont présents ou pas" },
                { name: "format-detection", content: "telephone=no" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
                { name: "apple-mobile-web-app-title", content: "Yaprof" },
                { name: "msapplication-TileColor", content: "#ffffff" },
                { name: "msapplication-TileImage", content: "/logo.png" },
                { name: "theme-color", content: "#ffffff" }

            ],
            link: [
                { rel: "icon", type: "image/png", href: "/favicon.ico" },
                { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css" },
            ],
            script: [
                {
                    src: "https://code.jquery.com/jquery-3.4.1.min.js",
                    type: "text/javascript",
                },
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js",
                    type: "text/javascript",
                },
                {
                    type: "text/javascript",
                    src: "/js/SideBar.js",
                    body: true,
                },
                {
                    type: "text/javascript",
                    src: "/js/PopupCreator.js",
                    body: true,
                },
                {
                    type: "text/javascript",
                    src: "/js/Home.js",
                    body: true,
                },
                {
                    type: "text/javascript",
                    src: "/js/CreatePost.js",
                    body: true,
                }
            ],
        },
    },
    css: ['~/assets/css/main.css'],
    components: [
        {
            path: '~/components',
            extensions: ['.vue'],
        }
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            ENVIRONMENT: 'production',
            URL: 'yaprof.fr',
            API_URL: 'https://api.yaprof.fr',
            PRONOTE_API_URL: 'https://pronoteapi.yaprof.fr',
        }
    },
    colorMode: {
        classSuffix: ""
    },
    pwa: {
        manifest: {
            name: "Yaprof",
            short_name: "Yaprof",
            description: "L'application préférée des étudiants - Vous pourrez savoir si vos profs sont présents ou pas",
            lang: "fr",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            orientation: "portrait",
            start_url: "/",
            icons: [
                {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: 'https://api.yaprof.fr/.*',
                    handler: 'NetworkFirst',
                    method: 'GET',
                },
                {
                    urlPattern: 'https://pronoteapi.yaprof.fr/.*',
                    handler: 'NetworkFirst',
                    method: 'GET',
                },

                {
                    urlPattern: 'https://cdnjs.cloudflare.com/.*',
                    handler: 'CacheFirst',
                    method: 'GET',
                }
            ],
            navigateFallback: '/',
        },

    }
})


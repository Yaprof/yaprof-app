// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from 'vite-plugin-pwa'
export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode', '@vite-pwa/nuxt'],
    app: {
        head: {
            title: "Yaprof",
            htmlAttrs: {
                lang: "fr",
            },
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "description", name: "description", content: "L'application préférée des étudiants - Vous pourrez savoir si vos profs sont présents ou pas" },
                { name: "manifest", content: "/manifest.webmanifest" },
                { name: "format-detection", content: "telephone=no" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-title", content: "Yaprof" },
                { name: "msapplication-TileColor", content: "#12d4a6" },
                { name: "msapplication-TileImage", content: "/icons/icon_192x192.png" },
                { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
                { name: "theme-color", content: "#1f2937", media: "(prefers-color-scheme: dark)" },

            ],
            link: [
                { rel: "icon", type: "image/png", href: "/favicon.ico" },
                { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css" },
                { rel: "apple-touch-icon", sizes: "96x96", href: "/icons/icon_96x96.png" },
                { rel: "apple-touch-startup-image", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/splash/launch-828x1792.png" },

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
                    src: "/js/pwa.js",
                    body: true,
                },
                {
                    type: "text/javascript",
                    src: "/js/taphold.js",
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
            API_URL: 'https://api.yaprof.fr',//'https://api.yaprof.fr', // 'http://localhost:8080',
            PRONOTE_API_URL: 'https://api.getpapillon.xyz'//'https://pronoteapi.yaprof.fr', // 'http://localhost:8000',
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
            theme_color: "#12d4a6",
            background_color: "#12d4a6",
            display: "standalone",
            orientation: "portrait",
            start_url: "/",
            scope: "/",
            icons: [
                {
                    src: "/icons/icon_48x48.png",
                    sizes: "48x48",
                    type: "image/png",
                },
                {
                    src: "/icons/icon_72x72.png",
                    sizes: "72x72",
                    type: "image/png",
                },
                {
                    src: "/icons/icon_96x96.png",
                    sizes: "96x96",
                    type: "image/png",
                },
                {
                    src: "/icons/icon_144x144.png",
                    sizes: "144x144",
                    type: "image/png",
                },
                {
                    src: "/icons/icon_192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/icons/icon_512x512.png",
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
            ],
            navigateFallback: '/',
        },

    }
})


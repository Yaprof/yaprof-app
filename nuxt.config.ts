
export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode'],
    app: {
/*         pageTransition: { name: 'page', mode: 'out-in' }, */
        head: {
            title: "Yaprof - La nouvelle app des étudiants",
            htmlAttrs: {
                lang: "fr",
            },
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
                { hid: "description", name: "description", content: "Yaprof est une application mobile utilisant Pronote dans le but de servir d'outil aux élèves et leur indiquer si un professeur est présent ou non." },
                { name: "robots", content: "all" },
                { name: "keywords", content: "yaprof, app, pronote, pronoteapi, scolaire, lycée, collège, notes, profs application" },
                { name: "publisher", content: "Alexandre VARGAS LOPEZ" },
                { name: "format-detection", content: "telephone=no" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-title", content: "Yaprof" },
                { name: "msapplication-TileColor", content: "#12d4a6" },
                { name: "msapplication-TileImage", content: "/icons/icon_512x512.png" },
                { name: "msapplication-tap-highlight", content: "no" },
                { name: "HandheldFriendly", content: "true" },
                { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
                { name: "theme-color", content: "#1f2937", media: "(prefers-color-scheme: dark)" },

            ],
            link: [
                { rel: "icon", type: "image/png", href: "/favicon.ico" },
                { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css" },
                { rel: "stylesheet", href: "https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300&display=swap" },
                { rel: "manifest", href: "/manifest.webmanifest" },
                { rel: "apple-touch-icon", sizes: "512x512", href: "/icons/icon_512x512.png" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_14_Pro_Max_portrait.png", media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_14_Pro_portrait.png", media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png", media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png", media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png", media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png", media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_11__iPhone_XR_portrait.png", media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_11__iPhone_XR_portrait.png", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"},
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png", media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png", media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png", media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/12.9__iPad_Pro_portrait.png", media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/11__iPad_Pro__10.5__iPad_Pro_portrait.png", media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/10.9__iPad_Air_portrait.png", media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/10.5__iPad_Air_portrait.png", media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/10.2__iPad_portrait.png", media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png", media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
                { rel: "apple-touch-startup-image", href: "/splash/8.3__iPad_Mini_portrait.png", media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
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
            API_URL: 'http://localhost:8080',//'https://api.yaprof.fr', // 'http://localhost:8080',
            PRONOTE_API_URL: 'https://pronoteapi.yaprof.fr'//'https://pronoteapi.yaprof.fr', // 'http://localhost:8000'
        }
    },
    colorMode: {
        classSuffix: ""
    },
})


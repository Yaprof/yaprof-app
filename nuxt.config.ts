// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode'],
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
    buildModules: [
        '@nuxtjs/pwa',
    ],
    pwa: {
        icon: false,
        meta: {
            name: "Yaprof",
            description: "L'application préférée des étudiants - Vous pourrez savoir si vos profs sont présents ou pas",
            theme_color: "#ffffff",
            ogHost: "https://yaprof.fr",
            ogImage: "/logo.png",
            ogTitle: "Yaprof",
            ogDescription: "L'application préférée des étudiants - Vous pourrez savoir si vos profs sont présents ou pas",
            twitterCard: "summary_large_image",
            twitterSite: "@yaprof",
            twitterCreator: "@yaprof",
        },
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
            mobileAppIOS: true,
            scope: "/",
            icons: [
                {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
    }
})


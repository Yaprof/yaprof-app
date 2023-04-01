// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode'],
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
            API_URL: 'http://localhost:3000',
            PRONOTE_API_URL: 'http://localhost:8000',
        }
    },
    colorMode: {
        classSuffix: ""
    }
})


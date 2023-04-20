<template>
    <div>
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <NavBar :user="user" @toggle-sidebar="onToggleSidebar" />
        <SideBar :errors="errors" :user="user" :is-open="isSidebarOpen" @close-sidebar="closeSidebar" />
        <div id="loading_div" class="pt-6 pb-10 mt-10 transition-all z-0 absolute top-0 left-0 w-full" style="transform: translateY(-100px);">
            <div class="w-full h-24 bg-primary flex items-center justify-center pt-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        </div>
        <div class="px-5 pt-10 pb-16 mt-10 transition-all">
            <slot />
        </div>
    </div>
</template>

<script>
import { getUser } from '~~/mixins/user';
export default {
    data() {
        return {
            user: {},
            isSidebarOpen: false,
            config: { api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL },
            errors: [],
        }
    },
    methods: {
        onToggleSidebar() {
            if (window.document.querySelector('html').style.overflowY)
                window.document.querySelector('html').style.overflowY = null;
            else
                window.document.querySelector('html').style.overflowY = 'hidden';
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        closeSidebar() {
            if (this.isSidebarOpen) {
                this.isSidebarOpen = false;
                window.document.querySelector('html').style.overflowY = null;
            }
        }
    },
    async mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.user = await getUser(this.config.api, this.user.id)
        if (!this.user) return this.errors.push({ message: "Impossible de charger l'utilisateur", color: "danger" })

        const pStart = { x: 0, y: 0 };
        const pCurrent = { x: 0, y: 0 };
        let isLoading = false;
        let thos = this

        async function loading() {
            if (isLoading) return
            isLoading = true;
            thos.user = await getUser(thos.config.api, thos.user.id)
            if (!thos.user) return thos.errors.push({ message: "Impossible de charger l'utilisateur", color: "danger" })
            if (window.location.pathname == '/')
            setTimeout(() => {
                isLoading = false;
            }, 2000)
        }

        function swipeStart(e) {
            if (typeof e["targetTouches"] !== "undefined") {
                let touch = e.targetTouches[0];
                pStart.x = touch.screenX;
                pStart.y = touch.screenY;
            } else {
                pStart.x = e.screenX;
                pStart.y = e.screenY;
            }
        }

        function swipeEnd(e) {
            if (document.body.scrollTop === 0 && !isLoading) {
            }
        }

        function swipe(e) {
            if (typeof e["changedTouches"] !== "undefined") {
                let touch = e.changedTouches[0];
                pCurrent.x = touch.screenX;
                pCurrent.y = touch.screenY;
            } else {
                pCurrent.x = e.screenX;
                pCurrent.y = e.screenY;
            }
            let changeY = pStart.y < pCurrent.y ? Math.abs(pStart.y - pCurrent.y) : 0;
            const rotation = changeY < 100 ? changeY * 30 / 100 : 30;
            if (window.scrollY === 0 || document.body.scrollTop === 0) {
                if (changeY > 200) loading();
            }
        }

        document.addEventListener("touchstart", e => swipeStart(e), false);
        document.addEventListener("touchmove", e => swipe(e), false);
        document.addEventListener("touchend", e => swipeEnd(e), false);
    },
}
</script>
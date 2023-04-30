<template>
    <div>
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <NavBar :user="user" @toggle-sidebar="onToggleSidebar" />
        <SideBar v-click-outside="closeSidebar" :errors="errors" :user="user" :is-open="isSidebarOpen" @close-sidebar="closeSidebar" />
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
import { getUser, updateFeed } from '~~/mixins/user';
import axios from 'axios'
export default {
    data() {
        return {
            user: {},
            isSidebarOpen: false,
            config: useRuntimeConfig(),
            errors: [],
            pStart: { x: 0, y: 0 },
            pCurrent: { x: 0, y: 0 },
            isLoading: false
        }
    },
    methods: {
        onToggleSidebar() {
            this.askPermission()
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
        },
        async askPermission() {
            const permission = await Notification.requestPermission();
            if (permission == "granted") {
                await this.registerServiceWorker();
            }
        },
        async registerServiceWorker() {
            let registration;
            let subscription;
            try {
                registration = await navigator.serviceWorker.register("/sw-notif.js");
                subscription = await registration.pushManager.getSubscription();
            } catch (e) {
                alert(e)
                console.log(e)
            }

            // L'utilisateur n'est pas déjà abonné, on l'abonne au notification push
            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: await this.getPublicKey(),
                });
            }
            await this.saveSubscription(subscription);
        },
        async saveSubscription(subscription) {
            await axios.post(this.config.public.API_URL+"/push/register?userInfos="+window.localStorage.getItem('userInfos'), {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + window.localStorage.getItem('token')
                },
                body: subscription.toJSON(),
            }).catch(e => {
                return console.log(e)
            })
        },
        async getPublicKey() {
            const key = await fetch(this.config.public.API_URL+"/push/key?userInfos="+window.localStorage.getItem('userInfos'), {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + window.localStorage.getItem('token')
                },
            }).then((r) => r.json());
            return key;
        },
        async loading() {
            if (this.isLoading) return
            this.isLoading = true;
            try {
                navigator.vibrate(100);
            } catch(e) { console.log(e) }
            this.user = await getUser(this.config.api, this.user.id)
            if (!this.user) return this.errors.push({ message: "Impossible de charger l'utilisateur", color: "danger" })
            setTimeout(() => {
                this.isLoading = false;
            }, 2000)
        },
        swipeStart(e) {
            if (typeof e["targetTouches"] !== "undefined") {
                let touch = e.targetTouches[0];
                this.pStart.x = touch.screenX;
                this.pStart.y = touch.screenY;
            } else {
                this.pStart.x = e.screenX;
                this.pStart.y = e.screenY;
            }
        },
        swipe(e) {
            if (typeof e["changedTouches"] !== "undefined") {
                let touch = e.changedTouches[0];
                this.pCurrent.x = touch.screenX;
                this.pCurrent.y = touch.screenY;
            } else {
                this.pCurrent.x = e.screenX;
                this.pCurrent.y = e.screenY;
            }
            let changeY = this.pStart.y < this.pCurrent.y ? Math.abs(this.pStart.y - this.pCurrent.y) : 0;
            const rotation = changeY < 100 ? changeY * 30 / 100 : 30;
            if (window.scrollY === 0) {
                if (changeY > 200) this.loading();
            }
        }
    },
    beforeUnmount() {
        window.removeEventListener("touchstart", this.swipeStart);
        window.removeEventListener("touchmove", this.swipe);
    },
    async mounted() {
        console.log(this)
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.user = await getUser(this.config.public.API_URL, this.user.id)
        if (!this.user) return this.errors.push({ message: "Impossible de charger l'utilisateur", color: "danger" })
        window.addEventListener("touchstart", this.swipeStart);
        window.addEventListener("touchmove", this.swipe);
    },
}
</script>
<template>
   <NuxtLayout>
        <Creator :user="user" />
        <div id="container_div"  class="overflow-y-scroll transition-all">
            <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
            <div class="w-full flex items-center justify-evenly">
                <div @click="changeType('daily')" class="py-3 flex items-center justify-center flex-col gap-2">
                    <p class="text-dark dark:text-white text-lg">Aujourd'hui</p>
                    <div class="w-full px-1"><div :class="(type == 'daily' ? 'bg-primary ': '') + ' opacity-40 w-full h-[3px] rounded-full'"></div></div>
                </div>
                <div @click="changeType('weekly')" class="py-3 flex items-center justify-center flex-col gap-2">
                    <p class="text-dark dark:text-white text-lg">Semaine</p>
                    <div class="w-full px-1"><div :class="(type == 'weekly' ? 'bg-primary ': '') + ' opacity-40 w-full h-[3px] rounded-full'"></div></div>
                </div>
            </div>
            <div class="pt-5 gap-8 flex flex-col overflow-y-scroll pb-10">
                <!-- Daily -->
                <div class="flex flex-col gap-8" v-if="type=='daily'" >
                    <Post :user="user" v-for="abs in absences" :key="abs" :data="abs"></Post>
                </div>

                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>

                <!-- Weekly -->
                <div v-if="type=='weekly'" class="flex flex-col gap-8">
                    <p class="text-dark dark:text-white text-2xl font-bold">Lundi</p>
                    <Post :user="user" v-for="abs in absences.filter(ab=> new Date(ab.createdAt).getDay() == 1)" :key="abs" :data="abs"></Post>
                    <p class="text-dark dark:text-white text-2xl font-bold">Mardi</p>
                    <Post :user="user" v-for="abs in absences.filter(ab=> new Date(ab.createdAt).getDay() == 2)" :key="abs" :data="abs"></Post>
                    <p class="text-dark dark:text-white text-2xl font-bold">Mercredi</p>
                    <Post :user="user" v-for="abs in absences.filter(ab=> new Date(ab.createdAt).getDay() == 3)" :key="abs" :data="abs"></Post>
                    <p class="text-dark dark:text-white text-2xl font-bold">Jeudi</p>
                    <Post :user="user" v-for="abs in absences.filter(ab=> new Date(ab.createdAt).getDay() == 4)" :key="abs" :data="abs"></Post>
                    <p class="text-dark dark:text-white text-2xl font-bold">Vendredi</p>
                    <Post :user="user" v-for="abs in absences.filter(ab=> new Date(ab.createdAt).getDay() == 5)" :key="abs" :data="abs"></Post>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<script>
import {getUser} from '../mixins/user.js'
export default {
    data() {
        return {
            absences: [],
            errors: [],
            loading: false,
            type: window.localStorage.getItem('type_post'),
            getUser: getUser,
            config: {api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL}
        }
    },
    methods: {
        getDbFeed: async function () {
            this.loading = true
            let response = await fetch(this.$config.API_URL + "/feed/"+JSON.parse(window.localStorage.getItem('user'))?.id+"?type="+this.type, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const absences = await response.json();
            if (absences) {
                this.loading = false
                this.absences = absences
            }
            else this.errors.push({ message: "Impossible de charger le feed", color: "danger" })
            return absences
        },
        handleScroll(e) {
            console.log(e.target.scrollTo)
            if (e.target.scrollTop === 0) {
                this.$emit("refresh");
            }
        },
        async changeType(type) {
            this.type = type
            window.localStorage.setItem('type_post', type)
            await this.getDbFeed()
        }
    },
    async mounted() {
        let config = this.config
        this.loading = true
        this.user = await this.getUser(config.api, JSON.parse(window.localStorage.getItem('user')).id);
        if (!this.user) {
            console.log('error user')
            return this.errors.push({ message: "Impossible de se connecter", color: "danger" })
        }
        this.getDbFeed()
        let thos = this

        const pStart = { x: 0, y: 0 };
        const pCurrent = { x: 0, y: 0 };
        const main = document.querySelector("#loading_div");
        const container_div = document.querySelector("#container_div")
        let isLoading = false;

        async function loading() {
            if (isLoading) return
            isLoading = true;
            thos.loading = true
            let infos = await thos.getDbFeed()
            if (infos) {
                setTimeout(function () {
                    isLoading = false;
                    this.loading = false
                    try {
                        navigator.vibrate()
                    } catch (e) { return }
                }, 500);
            } else {
                thos.loading = false
                return this.errors.push({ message: "Impossible de charger le feed", color: "danger" })
            }
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
            if (document.body.scrollTop === 0) {
                if (changeY > 100) loading();
            }
        }

        document.addEventListener("touchstart", e => swipeStart(e), false);
        document.addEventListener("touchmove", e => swipe(e), false);
        document.addEventListener("touchend", e => swipeEnd(e), false);
    },

}
</script>
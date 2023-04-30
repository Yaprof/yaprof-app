<template>
    <div>
        <NuxtLayout>
            <Creator :user="user" />
            <div id="container_div"  class="transition-all">
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
                <div class="pt-5 gap-8 flex flex-col pb-10">
                    <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex justify-center items-center flex-col gap-2 pt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p class="text-dark dark:text-white">Chargement en cours</p>
                    </div>

                    <!-- Daily -->
                    <div v-if="type == 'daily'">
                        <TransitionGroup class="flex flex-col gap-8 transition-all" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(new Date().getDay())" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(new Date().getDay()).length < 1" class="bg-light dark:bg-secondary rounded-xl py-3.5 flex justify-center items-center flex-col gap-1">
                                <img src="/no.png" class="w-10 h-10" />
                                <p class="text-dark dark:text-white w-full text-center font-medium">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                    </div>

                    <!-- Weekly -->
                    <div v-if="type=='weekly'" class="flex flex-col gap-8">
                        <p class="text-dark dark:text-white text-2xl font-bold">Lundi</p>
                        <TransitionGroup class="flex flex-col gap-8" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(1)" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(1).length < 1" class="bg-light dark:bg-secondary rounded-xl py-2">
                                <p class="text-dark dark:text-white w-full text-center">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                        <p class="text-dark dark:text-white text-2xl font-bold">Mardi</p>
                        <TransitionGroup class="flex flex-col gap-8" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(2)" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(2).length < 1" class="bg-light dark:bg-secondary rounded-xl py-2">
                                <p class="text-dark dark:text-white w-full text-center">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                        <p class="text-dark dark:text-white text-2xl font-bold">Mercredi</p>
                        <TransitionGroup class="flex flex-col gap-8" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(3)" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(3).length < 1" class="bg-light dark:bg-secondary rounded-xl py-2">
                                <p class="text-dark dark:text-white w-full text-center">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                        <p class="text-dark dark:text-white text-2xl font-bold">Jeudi</p>
                        <TransitionGroup class="flex flex-col gap-8" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(4)" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(4).length < 1" class="bg-light dark:bg-secondary rounded-xl py-2">
                                <p class="text-dark dark:text-white w-full text-center">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                        <p class="text-dark dark:text-white text-2xl font-bold">Vendredi</p>
                        <TransitionGroup class="flex flex-col gap-8" tag="Post" @enter="onEnterListSlideUp">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in getDayOfWeek(5)" :key="abs" :data="abs"></Post>
                            <div v-if="!loading && getDayOfWeek(5).length < 1" class="bg-light dark:bg-secondary rounded-xl py-2">
                                <p class="text-dark dark:text-white w-full text-center">Aucune absence en vue</p>
                            </div>
                        </TransitionGroup>
                    </div>

                    <div :class="((darkOpacity && holded?.author?.id == user?.id && [20, 50, 99].includes(user?.role)) ? 'bg-dark bg-opacity-50' : 'pointer-events-none opacity-0') + ' fixed top-0 left-0 h-screen w-full z-[100] transition-all'"></div>
                    <Transition v-if="holded?.author?.id == user.id || [20, 50, 99].includes(user?.role)" name="slide-down" mode="out-in">
                        <div :class="(holded ? '': 'translate-y-full') + ' bg-light dark:bg-secondary p-5 pb-14 fixed bottom-0 left-0 w-full flex flex-col text-dark dark:text-white transition-all z-[101]'" v-click-outside="closePopupInfos">
                            <div @click="deletePost(holded?.id)" class="flex items-center justify-center gap-2 text-red-500 group cursor-pointer active:text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-active:scale-95">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <p v-if="!loadingDelete">Supprimer</p>
                                <div v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<script>
import { getUser, getDbFeed, updateFeed } from '../mixins/user.js'
import { gsap } from "gsap";


export default {
    name: "Home",
    data() {
        return {
            absences: [],
            errors: [],
            pStart: { x: 0, y: 0 },
            pCurrent: { x: 0, y: 0 },
            loading: true,
            type: 'daily',
            user: {},
            getUser: getUser,
            getDbFeed: getDbFeed,
            config: useRuntimeConfig(),
            holdTimer: null,
            holded: false,
            touchStartPosition: { x: 0, y: 0 },
            darkOpacity: false,
            loadingDelete: false
        }
    },
    methods: {
        deletePost: function (id) {
            if (!id) return this.errors.push({ message: "Impossible de réaliser l'action", color: "danger" })
            this.loadingDelete = true
            fetch(this.config.public.API_URL + `/post/${id}?userInfos=`+window.localStorage.getItem('userInfos'), {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then(response => response.json())
                .then(async (response) => {
                    if (response?.error || !response) return this.errors.push({ message: "Impossible de réaliser l'action", color: "danger" })
                    window.document.querySelector('#container_info_'+this.holded.id).classList.add('hidden')
                    this.holded = false
                    this.darkOpacity = false
                    console.log(response)
                    this.absences.splice(this.absences.indexOf(this.absences.find(e => e.id == response.id)), 1)
                    this.loadingDelete = false
                })
                .catch(async e => {
                    this.loadingDelete = false
                    return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
                })
        },
        handleScroll(e) {
            if (e.target.scrollTop === 0) {
                this.$emit("refresh");
            }
        },
        async changeType(type) {
            this.absences = []
            this.loading = true
            this.type = type
            window.localStorage.setItem('type_post', type)
            await this.updateUserFeed()
        },
        onEnterListSlideUp(el, done) {
            gsap.fromTo(el, {y: 5, opacity: 0.2}, {
                opacity: 1,
                delay: el.dataset.index * 0.1,
                duration: 0.2,
                onComplete: done,
                y: 0
            })
        },
        closePopupInfos: function () {
            this.holded = false
            setTimeout(() => {
                this.darkOpacity = false
            }, 100)
        },
        startHold(event, data) {
            this.holdTimer = setTimeout(() => {
                this.holded = data
                this.darkOpacity = true
            }, 300);
        },
        checkHoldMove(event) {
            if (event.touches[0].clientX !== this.touchStartPosition.x || event.touches[0].clientY !== this.touchStartPosition.y) {
                clearTimeout(this.holdTimer);
            }
        },
        endHold(event) {
            clearTimeout(this.holdTimer);
            this.endEventTarget = event.target;
        },
        getDayOfWeek(number) {
            if (!this.absences?.length) return []
            let new_absences = this.absences.filter(ab => new Date(ab.createdAt).getDay() == number)
            return new_absences.filter(ab => this.isSameWeek(new Date(ab.createdAt), new Date()))
        },
        getWeek(date) {
            const janFirst = new Date(date.getFullYear(), 0, 1);
            return Math.ceil((((date.getTime() - janFirst.getTime()) / 86400000) + janFirst.getDay() + 1) / 7);
        },
        isSameWeek(dateA, dateB) {
            return this.getWeek(dateA) === this.getWeek(dateB);
        },
        async updateUserFeed() {
            this.loading = true
            this.absences = []
            this.absences = await this.getDbFeed(this.config.public.API_URL)
            this.loading = false
        },
        async reload() {
            if (this.loading) return
            this.loading = true;
            this.updateUserFeed()
            try {
                navigator.vibrate(100);
            } catch(e) { console.log(e) }
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
            if (window.scrollY === 0 || window.document.body.scrollTop === 0) {
                if (changeY > 200) this.reload();
            }
        }
    },
    beforeUnmount() {
        window.removeEventListener("touchstart", this.swipeStart);
        window.removeEventListener("touchmove", this.swipe);
    },
    async mounted() {
        window.addEventListener("touchstart", this.swipeStart);
        window.addEventListener("touchmove", this.swipe);
        this.user = JSON.parse(window.localStorage.getItem('user'))
        await this.updateUserFeed()
        /*         this.$root.$on('updateUserFeed', await this.updateUserFeed()); */
    },

}
</script>
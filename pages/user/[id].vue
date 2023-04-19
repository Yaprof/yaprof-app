<template>
    <div>
        <NuxtLayout>
            <div>
                <div class="flex items-center gap-3 pb-3 -mt-2">
                    <button @click="goToPrev()" class="active:scale-95 transition-all cursor-pointer p-2 z-50 text-dark dark:text-light">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
                            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Informations</h1>
                </div>
                <div class="flex flex-col gap-5">
                    <div class="w-full shadow-md relative rounded-xl overflow-hidden bg-dark dark:bg-secondary h-[164px]">
                        <img class="w-full h-[164px] object-cover object-center absolute top-0 left-0 blur-lg brightness-110 dark:brightness-90 rounded-xl" :src="user.profile?.pp" />
                        <div class="flex flex-col p-5">
                            <div class="flex items-center gap-1">
                                <img onerror="this.onerror=null;this.src='/icons/icon_72x72.png';" class="mb-2 h-16 w-16 object-cover z-10 rounded-full object-center mr-2" :src="user.profile?.pp" />
                                <svg v-if="[20, 50, 99].includes(user?.role)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-sky-400 z-50">
                                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <p class="text-lg text-white z-50 font-medium">{{ user.name }}</p>
                            <div class="flex items-center gap-2 opacity-70">
                                <p class="text-md text-white z-50 whitespace-nowrap">{{ user.class }}</p>
                                <p class="text-md text-white z-50">-</p>
                                <p class="text-md text-white z-50 whitespace-nowrap truncate">{{ user.establishment }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-xl bg-light dark:bg-secondary py-3.5 px-6">
                        <p class="font-medium text-lg pb-5 text-dark dark:text-white">Ensemble des posts ({{ user?.posts?.length }})</p>
                        <TransitionGroup name="slide-up" tag="Post" @enter="onEnterListSlideUp" class="flex flex-col gap-8">
                            <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="user" :type="type" v-for="(abs, index) in user.posts" :key="abs" :data="abs"></Post>
                        </TransitionGroup>
                    </div>
                </div>

                <div :class="(darkOpacity ? 'bg-dark bg-opacity-50' : 'pointer-events-none opacity-0') + ' fixed top-0 left-0 h-screen w-full z-[100] transition-all'"></div>
                <div v-if="holded?.author?.id == user.id || [20, 50, 99].includes(user?.role)" :class="(holded ? '': 'translate-y-full') + ' bg-light dark:bg-secondary p-5 pb-14 fixed bottom-0 left-0 w-full flex flex-col text-dark dark:text-white transition-all z-[101]'" v-click-outside="closePopupInfos">
                    <div @click="deletePost(holded?.id)" class="flex items-center justify-center gap-2 text-red-500 group cursor-pointer active:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-active:scale-95">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <p>Supprimer</p>
                    </div>
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
import { getUsers, getUserById } from '~~/mixins/user';
import { gsap } from "gsap";

export default {
    data() {
        return {
            user: {posts: []},
            config: { api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL },
            holdTimer: null,
            holded: false,
            touchStartPosition: { x: 0, y: 0 },
            darkOpacity: false
        }
    },
    methods: {
        goToPrev() {
            let params = (new URL(window.document.location)).searchParams;
            if (params.get('q') == "admin")
                this.$router.push({ path: '/admin/users' })
            else this.$router.push({ path: '/' })
        },
        deletePost: function (id) {
            if (!id) return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
            fetch(this.$config.API_URL + `/post/${id}?userInfos=`+window.localStorage.getItem('userInfos'), {
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
                })
                .catch(async e => {
                    return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
                })
        },
        handleScroll(e) {
            if (e.target.scrollTop === 0) {
                this.$emit("refresh");
            }
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
    },
    async mounted() {
        let config = this.config
        this.user = await getUserById(config.api, this.$route.params.id)
        console.log(this.user)
    }
}
</script>
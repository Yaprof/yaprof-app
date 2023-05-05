<template>
    <div>
        <NuxtLayout>
            <Transition>
                <div v-if="show">
                    <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
                    <div class="flex flex-col gap-5">
                        <NuxtLink to="/params" class="group bg-light active:bg-slate-50 dark:bg-secondary dark:active:bg-opacity-50 text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all z-10">
                            <div class="flex items-center gap-2">
                                <div class="w-fit h-fit p-2 bg-">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                        <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
                                    </svg>

                                </div>

                                <div class="flex flex-col justify-start">
                                    <p class="text-lg font-bold text-left">Mes paramètres</p>
                                    <p class="text-sm truncate text-left -mt-1">Accédez à vos paramètres ici</p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>

                        </NuxtLink>
                        <div v-if="!loading" class="w-full shadow-md relative rounded-xl h-fit">
                            <div class="w-full h-full backdrop-blur-xl overflow-hidden absolute top-0 left-0 rounded-xl">
                                <img class="absolute top-0 left-0 h-full w-full object-cover blur-lg scale-150 brightness-110 dark:brightness-90" onerror="this.onerror=null;this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';" :src="userFetch.profile?.pp" />
                            </div>
                            <div class="flex flex-col p-5">
                                <div class="flex items-center gap-1">
                                    <img onerror="this.onerror=null;this.src='/icons/icon_72x72.png';" class="mb-2 h-16 w-16 object-cover z-10 rounded-full object-center mr-2" :src="userFetch.profile?.pp" />
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <svg v-if="[20, 50, 99].includes(userFetch?.role)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-sky-400 z-50">
                                            <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                        </svg>
                                        <img class="w-5 h-5 z-50" :src="'https://res.cloudinary.com/dzg9awmm8/image/upload/v1682000898/badges/'+badge+'.webp?w=10'" v-for="badge in userFetch.profile?.badges.slice(0, 16)" :key="badge" />
                                        <div v-if="[20, 50, 99].includes(user?.role)" v-click-outside="closePopupBadges" class="z-[51] relative">
                                            <div @click="popupBadges = !popupBadges" class="p-0.5 w-fit h-fit rounded-full bg-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                            </div>
                                            <Transition name="slide-up">
                                                <div v-if="popupBadges" id="badges_list" class="absolute shadow-2xl rounded-xl px-6 py-3 flex flex-col bg-white dark:bg-secondary z-[80] top-[calc(100%+5px)] -left-[450%] gap-2">
                                                    <li v-for="badge in badges" :id="badge.id" :key="badge" @load="userFetch.profile?.badges.find(b=>b==badge.id) ? selectedNewBadges.push(badge) : ''" class="flex items-center gap-3 min-w-max w-full">
                                                        <input class="w-5 h-5 bg-light accent-primary focus:ring-2 focus:ring-dark rounded text-dark dark:brightness-150 form-checkbox transition-all" @change="handleChangeCheckbox" :id="badge.name" type="checkbox" :checked="userFetch.profile?.badges.find(b=>b==badge.id)" value="">
                                                        <label :for="badge.name" class="text-lg font-medium text-dark dark:text-white w-full hover:cursor-pointer">{{ badge.name }}</label>
                                                    </li>
                                                    <div @click="valideBadges" class="w-full rounded-xl py-2 px-20 text-md font-medium bg-primary mt-2 active:scale-95 transition-all text-center">Valider</div>
                                                </div>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-lg text-white z-50 font-medium">{{ userFetch.name }}</p>
                                <div class="flex items-center gap-2 opacity-70">
                                    <p class="text-md text-white z-50 whitespace-nowrap">{{ userFetch.class }}</p>
                                    <p class="text-md text-white z-50">-</p>
                                    <p class="text-md text-white z-50 whitespace-nowrap truncate">{{ userFetch.establishment }}</p>
                                </div>
                                <div v-if="[20, 50, 99].includes(user?.role)" class="flex items-center gap-3">
                                    <div @click="banUser(userFetch?.id)" class="flex flex-col items-center justify-center p-2 pb-0 z-10 active:scale-95 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-red-500">
                                            <path fill-rule="evenodd" d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z" clip-rule="evenodd" />
                                        </svg>
                                        <p class=" drop-shadow-md text-white">Bannir</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-if="!loading" class="rounded-xl">
                            <p class="font-medium text-xl pb-5 text-dark dark:text-white pl-2">Vos posts ({{ userFetch?.posts?.length }})</p>
                            <TransitionGroup tag="Post" @enter="onEnterListSlideUp" class="flex flex-col gap-8">
                                <Post @touchstart="startHold($event, abs)" @touchend="endHold" @touchmove="checkHoldMove" :data-index="index" :user="userFetch" v-for="(abs, index) in userFetch.posts" :key="abs" :data="abs"></Post>
                            </TransitionGroup>
                        </div>

                        <!--  is loading -->
                        <div v-if="loading" class="w-full shadow-md relative rounded-xl overflow-hidden bg-dark dark:bg-secondary bg-opacity-50 h-[164px]">
                            <div class="w-[164px] h-[164px] object-cover object-center absolute top-0 left-0 blur-lg brightness-110 dark:brightness-90 rounded-xl"> </div>
                            <div class="flex flex-col p-5">
                                <div class="flex items-center gap-1">
                                    <div class="mb-2 h-16 w-16 object-cover z-10 rounded-full object-center mr-2 bg-light dark:secondary animate-pulse dark:bg-slate-500"> </div>
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <div class="text-lg text-white z-50 font-medium w-5 h-5 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                        <div class="text-lg text-white z-50 font-medium w-5 h-5 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                        <div class="text-lg text-white z-50 font-medium w-5 h-5 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                    </div>
                                </div>
                                <div class="text-lg text-white z-50 font-medium w-32 h-4 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                <div class="flex items-center gap-2 opacity-70 pt-2">
                                    <div class="text-lg text-white z-50 font-medium w-10 h-3.5 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                    <div class="text-lg text-white z-50 font-medium w-36 h-3.5 rounded-full animate-pulse bg-light dark:bg-slate-500"></div>
                                </div>
                            </div>
                        </div>
                        <div v-if="loading" class="rounded-xl bg-light dark:bg-secondary py-5 px-6">
                            <p class="font-medium text-lg pb-5 text-dark dark:text-white">Ensemble des posts ({{ userFetch?.posts?.length }})</p>
                            <div class="h-[calc(100%-2rem)] w-full flex justify-center items-center flex-col gap-2 pt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <p class="text-dark dark:text-white">Chargement en cours</p>
                            </div>
                        </div>
                    </div>

                    <div :class="(darkOpacity ? 'bg-dark bg-opacity-50' : 'pointer-events-none opacity-0') + ' fixed top-0 left-0 h-screen w-full z-[100] transition-all'"></div>
                    <Transition v-if="(holded?.author?.id == userFetch.id || [20, 50, 99].includes(userFetch?.role)) && !loading" name="slide-down" mode="out-in">
                        <div :class="(holded ? '': 'translate-y-full') + ' bg-light dark:bg-secondary p-5 pb-14 fixed bottom-0 left-0 w-full flex flex-col text-dark dark:text-white transition-all z-[101]'" v-click-outside="closePopupInfos">
                            <div @click="deletePost(holded?.id)" class="flex items-center justify-center gap-2 text-red-500 group cursor-pointer active:text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-active:scale-95">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <p>Supprimer</p>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </NuxtLayout>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<script>
import { updatebadges, getUserById, getAllBadges, changeBanUser } from '~~/mixins/user';
import { gsap } from "gsap";

export default {
    data() {
        return {
            show: false,
            user: { posts: [] },
            userFetch: { posts: [] },
            config: useRuntimeConfig(),
            holdTimer: null,
            holded: false,
            touchStartPosition: { x: 0, y: 0 },
            darkOpacity: false,
            loading: true,
            popupBadges: false,
            badges: [],
            errors: [],
            selectedNewBadges: [],
            getAllBadges: getAllBadges
        }
    },
    methods: {
        deletePost: function (id) {
            if (!id) return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
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
        closePopupBadges: function () {
            this.popupBadges = false
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
        async valideBadges(event) {
            let all_badges = [...event.target.parentNode.querySelectorAll('li')].filter(e => e.id && (e.id.length > 0) && e.querySelector('input').checked).map(e => e.id)

            let new_badges = await updatebadges(this.config.public.API_URL, this.userFetch.id, all_badges)
            if (!new_badges || new_badges.error) return this.errors.push({ message: "Impossible de mettre à jour les badges", color: "danger" })
            this.closePopupBadges()
            window.location.reload()
            return this.errors.push({ message: "Badges mis à jour", color: "success" })
        },
        async banUser(id) {
            if (!id) return this.errors.push({ message: "Impossible de trouver l'utilisateur", color: "danger" })
            let banned = await changeBanUser(this.config.public.API_URL, id)
            if (!banned || banned.error) return this.errors.push({ message: "Impossible de bannir l'utilisateur", color: "danger" })
            return this.errors.push({ message: "Utilisateur banni.", color: "success" })
        }
    },
    beforeUnmount() {
        this.show = false
    },
    async mounted() {
        this.show = true
        this.user = JSON.parse(window.localStorage.getItem('user'))
        this.badges = await this.getAllBadges(this.config.public.API_URL)
        this.userFetch = await getUserById(this.config.public.API_URL, this.$route.params.id)
        this.loading = false
    }
}
</script>
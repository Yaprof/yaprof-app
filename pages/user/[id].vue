<template>
    <div>
        <NuxtLayout>
            <Transition name="swipe-right">
                <div v-if="show">
                    <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
                    <div class="flex items-center gap-3 pb-3 -mt-2">
                        <button @click="goToPrev()" class="active:scale-95 transition-all cursor-pointer p-2 z-50 text-dark dark:text-light">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
                                <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <h1 class="text-dark dark:text-white text-3xl font-bold">Profil</h1>
                    </div>
                    <div class="flex flex-col gap-5">
                        <button @click="handleClickUpload" v-if="!loading && user.id == userFetch.id" id="avatar-upload-button" class="group bg-light active:bg-slate-50 dark:bg-secondary dark:active:bg-opacity-50 text-dark dark:text-white text-lg py-3.5 px-6 rounded-2xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all z-10">
                            <div class="flex items-center gap-2">
                                <div class="w-fit h-fit p-2 bg-">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                        <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
                                    </svg>
                                </div>

                                <div class="flex flex-col justify-start">
                                    <p class="text-lg font-bold text-left">Changer sa photo</p>
                                    <p class="text-sm truncate text-left -mt-1">Utilise une photo de profil différente</p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                            <input @change="handleChange" type="file" name="avatar_input" class="hidden" id="avatar_image" accept="image/*" />
                        </button>
                        <div v-if="!loading" class="w-full shadow-md relative rounded-xl h-[164px]">
                            <div class="w-full h-[164px] backdrop-blur-xl overflow-hidden absolute top-0 left-0 rounded-xl">
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
                            </div>
                        </div>
                        <div v-if="!loading" class="rounded-xl bg-light dark:bg-secondary py-5 px-6">
                            <p class="font-medium text-lg pb-5 text-dark dark:text-white">Ensemble des posts ({{ userFetch?.posts?.length }})</p>
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
                    <Transition v-if="holded?.author?.id == userFetch.id || [20, 50, 99].includes(userFetch?.role)" name="slide-down" mode="out-in">
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
import { updatebadges, getUserById, updateUser, getAllBadges } from '~~/mixins/user';
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
        goToPrev() {
            let params = (new URL(window.document.location)).searchParams;
            if (params.get('q') == "admin")
                this.$router.push({ path: '/admin/users' })
            else this.$router.push({ path: '/' })
        },
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
        handleChange(event) {
            const file = event.target.files[0];
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = async () => {
                    if (file.size > 10485760) {
                        this.errors.push({ message: "Impossible de changer la pp", color: "danger" })
                        this.value = "";
                        return;
                    };
                    let user = JSON.parse(window.localStorage.getItem("user"))
                    if (!user || !reader?.result) return this.errors.push({ message: "Impossible de changer la pp", color: "danger" })
                    let userdb = await updateUser(this.config.public.API_URL, reader.result)
                    if (!userdb) return this.errors.push({ message: "Image trop lourde", color: "danger" })
                    console.log(userdb)
                    this.errors.push({ message: "Photo de profile changée", color: "success" })
                };
            } catch (e) {
                return this.errors.push({ message: "Image trop lourde", color: "danger" })
            }
        },
        handleClickUpload(event) {
            let FILE_INPUT = window.document.getElementById("avatar_image");
            FILE_INPUT.click()
        },
        async valideBadges(event) {
            console.log([...event.target.parentNode.querySelectorAll('li')].map(e=>e.id))
            let all_badges = [...event.target.parentNode.querySelectorAll('li')].filter(e => e.id && (e.id.length > 0) && e.querySelector('input').checked).map(e => e.id)

            console.log(all_badges)
            let new_badges = await updatebadges(this.config.public.API_URL, this.userFetch.id, all_badges)
            if (!new_badges || new_badges.error) return this.errors.push({ message: "Impossible de mettre à jour les badges", color: "danger" })
            this.closePopupBadges()
            window.location.reload()
            return this.errors.push({ message: "Badges mis à jour", color: "success" })
        }
    },
    beforeUnmount() {
        console.log('unmout')
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
<template>
    <nav :class="(isShadowed ? 'shadow-sm' : '') + ' w-full fixed -top-0 left-0 h-fit flex flex-col justify-end bg-white dark:bg-dark z-[98] transition-all'" ref="nav">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="flex justify-between items-center h-16">
            <div class="flex text-dark dark:text-white gap-5 items-center cursor-pointer p-5 pr-0 sidebar-toggle max-w-max">
                <button v-if="pages[this?.$route?.name]?.backButton || this?.$route?.query?.q == 'admin'" @click="goToPrev(pages[this?.$route?.name], user.id)" class="active:scale-95 transition-all cursor-pointer p-2 z-50 text-dark dark:text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
                        <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="flex flex-col">
                    <Transition class="w-fit truncate text-ellipsis overflow-hidden duration-75" name="opacity" mode="out-in">
                        <h1 v-if="showTitle" class="text-2xl text-dark dark:text-white font-semibold">{{ pages[this?.$route?.name]?.name }}</h1>
                    </Transition>
                    <div v-if="!showTitle" class="w-32 h-8 rounded-full bg-light dark:bg-secondary animate-pulse"></div>
                </div>
            </div>
            <!-- <div @click="toggleSidebar()" class="flex text-dark dark:text-white gap-5 items-center cursor-pointer p-5 pr-0 sidebar-toggle max-w-max">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sidebar-toggle">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" class="sidebar-toggle" />
                </svg>
            </div>-->

            <div class="flex text-dark dark:text-white items-center gap-3 p-5 min-w-fit">
                <NuxtLink to="/shop" class="flex bg-primary bg-opacity-10 rounded-full py-2 pl-4 pr-2 items-center gap-1 min-w-fit">
                    <p class="text-dark dark:text-white">{{ user?.profile?.coins || 0 }}</p>
                    <img  src="~/assets/imgs/icons/coin.svg" class="w-6 h-6 object-cover object-center rounded-full" />
                </NuxtLink>
               <NuxtLink :to="'/user/' + user.id" class="rounded-full" >
                    <img onerror="this.onerror=null;this.src='/icons/icon_48x48.png';" :src="user.profile?.pp || '/icons/icon_48x48.png'" class="w-10 h-10 min-w-[2.5rem] object-cover object-center rounded-full shadow-md" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
import { getUser } from '~~/mixins/user';
export default {
    props: ['user'],
    data() {
        return {
            config: useRuntimeConfig(),
            errors: [],
            isSidebarOpen: false,
            isShadowed: false,
            showTitle: false,
            pages: {
                'index': {name: "Absences", backButton: false},
                'cantine': {name: "Cantine", backButton: false},
                'shop': {name: "Boutique", backButton: false},
                'params': {name: "Params", backButton: true, backTo: '/user/'},
                'user-id': {name: "Profil", backButton: false},
                'admin-users': {name: "Utilisateurs", backButton: false}
            },
        }
    },
    methods: {
        goToPrev(route, userId) {
            if (route.name == 'Profil') {
                let params = (new URL(window.document.location)).searchParams;
                if (params.get('q') == "admin") 
                    this.$router.push({ path: '/admin/users' })
            } else if (route.name == 'Params') {
                console.log(userId)
                this.$router.push({ path: '/user/'+userId})
            }
            else this.$router.push({ path: route?.backTo })
        },
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        },
        onScroll() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.isShadowed = scrollPosition > 0;
        /*     if (scrollPosition > 28) this.isHiddenTitle = false
            else this.isHiddenTitle = true */
        }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    },
    async mounted() {
        this.showTitle = true
        window.addEventListener('scroll', this.onScroll)
        /* this.userInfos = JSON.parse(window.localStorage.getItem("user"))
        let user = await getUser(this.config.public.API_URL, this.userInfos.id)
        if (!user) return this.errors.push({message: "Impossible de charger l'utilisateur", color: "danger"}) */
    },
}
</script>
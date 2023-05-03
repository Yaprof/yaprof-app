<template>
    <nav :class="(isShadowed ? 'shadow-sm' : '') + ' w-full fixed -top-0 left-0 h-fit flex flex-col justify-end bg-white dark:bg-dark z-[99] transition-all'" ref="nav">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="flex justify-between items-center h-16">
            <div @click="toggleSidebar()" class="flex text-dark dark:text-white gap-5 items-center cursor-pointer p-5 pr-0 sidebar-toggle max-w-max">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sidebar-toggle">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" class="sidebar-toggle" />
                </svg> -->
                <div class="flex flex-col">
                    <Transition class="w-fit truncate text-ellipsis overflow-hidden" name="opacity" mode="out-in">
                        <h1 class="text-3xl text-dark dark:text-white font-semibold">{{ pages[this?.$route?.name] }}</h1>
                    </Transition>
                </div>
            </div>
            <div class="flex text-dark dark:text-white items-center gap-3 p-5 min-w-fit">
                <NuxtLink to="/shop" class="flex bg-primary bg-opacity-10 rounded-full py-2 pl-4 pr-2 items-center gap-1 min-w-fit">
                    <p class="text-dark dark:text-white">{{ user?.profile?.coins || 0 }}</p>
                    <img  src="~/assets/imgs/icons/coin.svg" class="w-6 h-6 object-cover object-center rounded-full" />
                </NuxtLink>
               <!--  <NuxtLink to="/shop" class="flex bg-primary bg-opacity-10 rounded-full py-2 pl-4 pr-2 items-center gap-1 min-w-fit">
                    <p class="text-dark dark:text-white">53</p>
                    <img  src="~/assets/imgs/icons/coin.svg" class="w-6 h-6 object-cover object-center rounded-full" />
                </NuxtLink> -->
               <!--  <NuxtLink :to="'/user/' + user.id" class="rounded-full" >
                    <img onerror="this.onerror=null;this.src='/icons/icon_48x48.png';" :src="user.profile?.pp || '/icons/icon_48x48.png'" class="w-10 h-10 min-w-[2.5rem] object-cover object-center rounded-full shadow-md" />
                </NuxtLink> -->
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
            pages: {
                'index': "Paris",
                'cantine': "Cantine",
                'shop': "Boutique",
                'params': "Paramètres",
                'user-id': 'Profil',
                'admin-users': "Utilisateurs"
            },
        }
    },
    methods: {
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
        window.addEventListener('scroll', this.onScroll)
        /* this.userInfos = JSON.parse(window.localStorage.getItem("user"))
        let user = await getUser(this.config.public.API_URL, this.userInfos.id)
        if (!user) return this.errors.push({message: "Impossible de charger l'utilisateur", color: "danger"}) */
    },
}
</script>
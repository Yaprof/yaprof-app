<template>
    <nav :class="(isShadowed ? 'shadow-sm' : '') + ' w-full fixed -top-0 left-0 h-fit flex flex-col justify-end bg-white dark:bg-dark z-[1] !z-[99] transition-all'" ref="nav">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="flex justify-between items-center h-20">
            <div @click="toggleSidebar()" class="flex text-dark dark:text-white gap-5 items-center cursor-pointer p-5 sidebar-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sidebar-toggle">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" class="sidebar-toggle" />
                </svg>
            </div>
            <div class="flex text-dark dark:text-white items-center gap-3 p-5">
                <NuxtLink to="/shop" class="flex bg-primary bg-opacity-10 rounded-full py-2 pl-4 pr-2 items-center gap-1">
                    <p class="text-dark dark:text-white">{{ userInfos?.profile?.coins }}</p>
                    <img src="~/assets/imgs/icons/coin.svg" class="w-6 h-6 object-cover object-center rounded-full" />
                </NuxtLink>
                <NuxtLink to="/user/profile" class="rounded-full" >
                    <img :src="userInfos.profile?.pp" class="w-10 h-10 object-cover object-center rounded-full shadow-md" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
import { getUser } from '~~/mixins/user';
export default {
    data() {
        return {
            userInfos: { pp: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" },
            config: {api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL},
            errors: [],
            isSidebarOpen: false,
            isShadowed: false
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        },
        onScroll() {
            // Get the current scroll position
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            // Set isShadowed to true if scroll position is greater than 0, otherwise set it to false
            this.isShadowed = scrollPosition > 0;
        }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll); // Remove scroll event listener before component unmount
    },
    async mounted() {
        window.addEventListener('scroll', this.onScroll); // Add scroll event listener on component mount
        this.userInfos = JSON.parse(window.localStorage.getItem("user"))
        let user = await getUser(this.config.api, this.userInfos.id)
        if (!user) return this.errors.push({message: "Impossible de charger l'utilisateur", color: "danger"})
    },
}
</script>
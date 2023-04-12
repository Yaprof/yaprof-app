<template>
    <NuxtLayout>
        <div>
            <div class="flex items-center gap-3 pb-3 -mt-2">
                <button @click="goToPrev()" class="active:scale-95 transition-all cursor-pointer p-2 z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
                        <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                    </svg>
                </button>
                <h1 class="text-dark dark:text-white text-3xl font-bold">Informations</h1>
            </div>
            <div class="flex flex-col gap-2">
                <div class="w-full shadow-md relative rounded-xl overflow-hidden">
                    <img class="w-full object-cover object-center absolute top-0 left-0 h-full blur-lg scale-150 brightness-110 dark:brightness-90 rounded-xl" :src="user.profile?.pp" />
                    <div class="flex flex-col p-5">
                        <div class="flex items-center gap-1">
                            <img class="mb-2 h-16 w-16 object-cover z-10 rounded-full object-center mr-2" :src="user.profile?.pp" />
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
import { getUsers, getUserById } from '~~/mixins/user';
export default {
    data() {
        return {
            user: {},
            config: {api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL}
        }
    },
    methods: {
        goToPrev() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    },
    async mounted() {
        let config = this.config
        this.user = await getUserById(config.api, this.$route.params.id)
        console.log(this.user)
    }
}
</script>
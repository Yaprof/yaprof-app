<template>
    <div>
        <NuxtLayout>
            <div>
                <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Utilisateurs ({{ users?.length ?? 0 }})</h1>
                </div>
                <div class="flex flex-col gap-2">
                    <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex justify-center items-center flex-col gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p class="text-dark dark:text-white">Chargement en cours</p>
                    </div>
                    <NuxtLink :to="'/user/'+user.id+'?q=admin'" v-for="user in users" :key="user.id" class="w-full h-fit shadow-md rounded-xl p-5 gap-2 flex flex-col border dark:border-secondary">
                        <div class="flex items-center gap-3 w-full overflow-hidden">
                            <img onerror="this.onerror=null;this.src='/icons/icon_48x48.png';" class="w-12 h-12 aspect-square object-cover object-center rounded-full shadow-md" :src="user.profile?.pp" />
                            <div class="flex flex-col">
                                <div class="flex flex-items-center gap-2">
                                    <p class="text-dark dark:text-white text-lg whitespace-nowrap truncate font-medium">{{ user.name }}</p>
                                    <div class="pt-1">
                                        <svg v-if="[20, 50, 99].includes(user?.role)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-sky-400">
                                            <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 w-full">
                                    <p class="text-md text-dark dark:text-white z-50 whitespace-nowrap">{{ user.class }}</p>
                                    <p class="text-md text-dark dark:text-white z-50">-</p>
                                    <p class="text-md text-dark dark:text-white z-50 whitespace-nowrap truncate">{{ user.establishment }}</p>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
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
import { getUsers } from '~~/mixins/user';
export default {
    data() {
        return {
            users: [],
            config: { api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL },
            loading: false
        }
    },
    async mounted() {
        let config = this.config
        this.loading = true
        this.users = await getUsers(config.api)
        this.loading = false
    }
}
</script>
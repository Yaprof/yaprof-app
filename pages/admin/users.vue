<template>
    <div>
        <NuxtLayout>
            <div>
                <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Users ({{ users?.length ?? 0 }})</h1>
                </div>
                <div class="flex flex-col gap-2">
                    <NuxtLink :to="'/user/'+user.id+'?q=admin'" v-for="user in users" :key="user.id" class="w-full h-fit shadow-md rounded-xl p-5 gap-2 flex flex-col border">
                        <div class="flex items-center gap-3 w-full overflow-hidden">
                            <img class="w-12 h-12 aspect-square object-cover object-center rounded-full shadow-md" :src="user.profile?.pp" />
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
            config: {api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL}
        }
    },
    async mounted() {
        let config = this.config
        this.users = await getUsers(config.api)
    }
}
</script>
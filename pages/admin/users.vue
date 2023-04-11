<template>
    <NuxtLayout>
        <div>
            <div class="flex flex-col pb-5">
                <h1 class="text-dark dark:text-white text-3xl font-bold">Users ({{ users?.length ?? 0 }})</h1>
            </div>
            <div class="flex flex-col gap-2">
                <div v-for="user in users" :key="user.id" class="w-full h-fit shadow-md rounded-xl p-5">
                    <div class="flex items-center gap-3">
                        <img class="w-10 h-10 aspect-square object-cover object-center rounded-full shadow-md" :src="user.profile?.pp" />
                        <p class="text-dark dark:text-white text-lg whitespace-nowrap truncate">{{ user.name }}</p>
                        <div>
                            <svg v-if="[20, 50, 99].includes(user?.role)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-sky-400">
                                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                            </svg>
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
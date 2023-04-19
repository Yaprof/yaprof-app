<template>
    <div>
        <NuxtLayout>
            <div>
                <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Paramètres</h1>
                </div>

                <button @click="logout()" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-2xl w-full bg-light dark:bg-secondary dark:active:bg-gray-800 active:bg-gray-50 cursor-pointer flex items-center gap-2 justify-between transition-all">
                    <div class="w-fit h-fit p-2 bg-">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex flex-col justify-start">
                        <p class="text-lg font-bold text-left">Se déconnecter</p>
                        <p class="text-sm truncate text-left -mt-1">Retournez à la page de connexion</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-neutral-400 dark:text-neutral-300 group-active:translate-x-1 transition-all">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>

                </button>
            </div>
        </NuxtLayout>
    </div>

</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
export default {
    methods: {
        logout: function () {
            window.localStorage.clear();
            window.location.replace('/auth/login')
        }
    }
}
</script>
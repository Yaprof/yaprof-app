<template>
    <div>
        <NuxtLayout>
            <div>
                <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Paramètres</h1>
                </div>
                <button @click="logout()" class="text-white text-lg py-3 px-6 rounded-2xl w-full bg-red-500 active:bg-red-400">Se déconnecter</button>
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
            window.location.reload();
        }
    }
}
</script>
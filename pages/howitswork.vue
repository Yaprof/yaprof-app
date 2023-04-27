<template>

    <div class="p-5 py-10">
        <img src="~/public/icons/icon_144x144.png" class="w-20 mb-5"/>
        <div class="flex flex-col pb-2">
            <h1 class="text-dark dark:text-white text-3xl font-bold">Yaprof.fr</h1>
        </div>
        <p class="text-dark dark:text-white text-2xl pb-5">Comment installer l'application ?</p>

        <div v-if="this.os == 'ios'">
            <p class="text-primary text-xl font-medium pb-3">Étape n°1</p>
            <img src="~/public/IMG_0748.png" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-primary text-xl font-medium pb-3">Étape n°2</p>
            <img src="~/public/IMG_0749.png" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-primary text-xl font-medium pb-3">Étape n°3</p>
            <img src="~/public/IMG_0750.png" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-dark dark:text-white text-2xl font-medium pb-3 w-full text-center pt-5">Et voilà ! 🎉</p>
        </div>
        <div v-else>
            <p class="text-primary text-xl font-medium pb-3">Étape n°1</p>
            <img src="~/public/Screenshot_2023-04-27-16-10-03-407_com.android.chrome.jpg" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-primary text-xl font-medium pb-3">Étape n°2</p>
            <img src="~/public/Screenshot_2023-04-27-16-10-10-452_com.android.chrome.jpg" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-primary text-xl font-medium pb-3">Étape n°3</p>
            <img src="~/public/Screenshot_2023-04-27-16-10-16-613_com.android.chrome.jpg" class="w-full mb-5 rounded-xl border border-light dark:border-secondary"/>
            <p class="text-dark dark:text-white text-2xl font-medium pb-3 w-full text-center pt-5">Et voilà ! 🎉</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            os: null
        }
    },
    mounted() {
        this.os = window.matchMedia('(display-mode: standalone)').matches && /^iP/.test(navigator.platform) ? 'ios' : 'android'
    },
}
</script>
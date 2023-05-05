<template>
    <div class="p-5 py-10 pb-28">
        <img src="/icons/icon_144x144.png" class="w-20 mb-5"/>
        <div class="flex flex-col pb-2">
            <h1 class="text-dark dark:text-white text-3xl font-bold">Changelog - {{ release?.name }}</h1>
        </div>
        <p class="text-dark dark:text-white text-2xl pb-5">Quoi de neuf sur l'app ?</p>
        <div ref="body" class="text-lg font-medium leading-loose pt-5 text-dark dark:text-white"></div>

        <div class="fixed bottom-14 left-0 px-5 w-full">
            <p class="text-dark dark:text-white text-opacity-50 text-lg">Merci aux contribuateurs qui nous aident 💚</p>
            <a href="/" @click="setversion" class="mt-5 w-full rounded-xl bg-primary py-3.5 px-5 text-dark font-medium text-lg text-center flex items-center justify-center active:bg-opacity-50 transition-all shadow-md">Continuer</a>
        </div>
    </div>
</template>

<script>
import pkg from '~/package.json'
import axios from 'axios'
export default {
    data() {
        return {
            version: pkg['version'],
            release: {}
        }
    },
    methods: {
        setversion: function () {
            window?.localStorage.setItem('version', pkg['version'])
        },
        getLastRelease: async function () {
            let response = await axios.get('https://api.github.com/repos/yaprof/application/releases/latest').catch(e => { return {} })
            if (!response) return {}
            return response.data
        }
    },
    async mounted() {
        this.release = await this.getLastRelease()
        this.$refs.body.innerHTML = this.release.body?.replaceAll('\n', '<br>').replaceAll('##', '')
    },
}
</script>
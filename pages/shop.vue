<template>
    <div>
        <NuxtLayout>
            <div>
                <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
                <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Boutique</h1>
                </div>
                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex justify-center items-center flex-col gap-2 pt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-dark dark:text-white duration-75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p class="text-dark dark:text-white">Chargement en cours</p>
                </div>
                <div class="grid grid-cols-2 gap-5">
                    <div class="flex flex-col shadow-md rounded-xl overflow-hidden items-center justify-center group bg-light dark:bg-secondary !bg-opacity-50 relative" v-for="badge in badges" @click="openPopupBuy(badge)" :key="badge">
                        <div class="w-full h-28 flex items-center justify-center">
                            <img class="w-12 h-12 mt-5" :src="'https://res.cloudinary.com/dzg9awmm8/image/upload/v1682000898/badges/'+badge.id+'.webp'" />
                        </div>
                        <div :class="(user.profile.badges?.find(b => b == badge.id) ? 'bg-light text-dark dark:bg-secondary dark:text-white' : 'bg-primary text-dark') + ' flex items-center justify-center w-full  py-2.5'">
                            <p class="font-semibold group-active:scale-95 transition-all"> {{ user.profile.badges?.find(b => b == badge.id) ? 'Acheté' : 'Acheter'}} </p>
                        </div>
                        <div class="flex bg-primary bg-opacity-30 rounded-full py-1 pl-4 pr-2 items-center gap-1 absolute top-1 right-1">
                            <p class="text-dark dark:text-white">{{ badge.price || 0 }}</p>
                            <img src="~/assets/imgs/icons/coin.svg" class="w-5 h-5 object-cover object-center rounded-full" />
                        </div>
                    </div>
                </div>
                <div :class="(darkOpacity ? 'bg-dark bg-opacity-50' : ' opacity-0') + (pointer_event ? '': ' pointer-events-none') + ' fixed top-0 left-0 h-screen w-full z-[100] transition-all'"></div>
                <Transition name="slide-down" mode="out-in">
                    <div v-if="popup_buy"  :class="(popup_buy ? '': 'translate-y-full') + ' bg-light dark:bg-secondary p-5 pb-14 fixed bottom-0 left-0 w-full flex flex-col items-center justify-center gap-3 text-dark dark:text-white transition-all z-[101]'" v-click-outside="closePopupBuy">
                        <div v-if="user.profile.badges?.find(b => b == popup_buy.id)" :class="'bg-slate-200 dark:bg-slate-500 text-dark dark:text-white flex items-center justify-center gap-2 group cursor-pointer py-3 px-6 rounded-xl w-full transition-all ' + (loadingBuy ? 'bg-primaryhover' : '')">
                            <p>Déjà acheté</p>
                        </div>
                        <div v-else-if="popup_buy.price > user?.profile?.coins" :class="'bg-slate-200 dark:bg-slate-500 text-dark dark:text-white flex items-center justify-center gap-2 group cursor-pointer py-3 px-6 rounded-xl w-full transition-all ' + (loadingBuy ? 'bg-primaryhover' : '')">
                            <p>Il vous manque {{ popup_buy.price - user?.profile?.coins }} coins</p>
                        </div>
                        <div v-else @click="  buyBadgeClient(popup_buy.id)" :class="'bg-primary active:bg-primaryhover text-dark flex items-center justify-center gap-2 group cursor-pointer py-3 px-6 rounded-xl w-full transition-all ' + (loadingBuy ? 'bg-primaryhover' : '')">
                            <p>{{ loadingBuy ? 'Chargement...' : 'Acheter le badge' }}</p>
                        </div>
                        <div @click="closePopupBuy()" class="flex items-center justify-center gap-2 group cursor-pointer py-3 px-6 text-dark dark:text-white w-full">
                            <p>Annuler</p>
                        </div>
                    </div>
                </Transition>
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
import { getAllBadges, buyBadge } from '~/mixins/user'
export default {
    data() {
        return {
            badges: [],
            getAllBadges: getAllBadges,
            config: { api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL },
            loading: true,
            popup_buy: null,
            darkOpacity: false,
            pointer_event: false,
            errors: [],
            user: {},
            loadingBuy: false
        }
    },
    methods: {
        closePopupBuy: function () {
            this.popup_buy = null
            setTimeout(() => {
                this.darkOpacity = false
            }, 100)
            setTimeout(() => {
                this.pointer_event = false
            }, 500)
        },
        openPopupBuy: function (badge) {
            this.popup_buy = badge;
            this.darkOpacity = true;
            this.pointer_event = true
        },
        buyBadgeClient: async function (id) {
            if (!id) {
                this.errors.push({ message: 'Impossible de récupérer le badge', color: 'danger' })
                this.closePopupBuy()
            }
            console.log(this.user.profile.badges, id)
            if (this.user.profile.badges.find(b => b == id)){
                this.errors.push({ message: 'Vous avez déjà ce badge', color: 'danger' })
                this.closePopupBuy()
            }
            this.loadingBuy = true
            let badge = await buyBadge(this.config.api, id)
            if (!badge || badge.error) {
                this.loadingBuy = false
                return this.errors.push({ message: badge.error, color: 'danger' })
            }
            let badges = this.user.profile.badges
            badges.push(badge.id)
            this.user.profile.badges = badges
            this.errors.push({ message: 'Vous venez d\'acheter le badge', color: 'success' })
            this.closePopupBuy()
            this.loadingBuy = false
        }
    },
    async mounted() {
        this.badges = await this.getAllBadges(this.config.api)
        this.user = JSON.parse(window.localStorage.getItem('user'))
        this.loading = false
    },
}
</script>
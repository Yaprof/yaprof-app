<template>
    <div :id="'container_info_'+data?.id" class="flex flex-col gap-3 relative">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <NuxtLink :to="'/user/'+data.author?.id" class="flex items-center gap-2 pl-2 !bg-transparent">
            <img onerror="this.onerror=null;this.src='/icons/icon_48x48.png';" class="w-8 h-8 aspect-square object-cover object-center rounded-full shadow-md" :src="data.author?.profile?.pp" />
            <p class="text-dark dark:text-white text-md whitespace-nowrap truncate">{{ data.author?.name }}</p>
            <div class="flex items-center gap-2">
                <svg v-if="[20, 50, 99].includes(data.author?.role)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-sky-400">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>

                <img class="w-5 h-5" :src="'https://res.cloudinary.com/dzg9awmm8/image/upload/v1682000898/badges/'+badge+'.webp?w=10'" v-for="badge in data.author.profile.badges.slice(0, [20, 50, 99].includes(data.author?.role) ? 2 : 3)" :key="badge" />
            </div>
        </NuxtLink>
        <div class="flex flex-col shadow-md rounded-xl overflow-hidden">
            <div class="bg-opacity-40 py-3 px-6 flex items-center justify-between gap-2" :style="'background: '+(data.pointer?.color+'40')">
                <div class="flex items-center gap-2">
                    <svg class="w-6 h-6 text-dark dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-dark dark:text-white">{{ data.pointer?.name }}</p>
                </div>
            <p v-if="type == 'daily'" class="text-dark dark:text-white opacity-80">{{ new Date(new Date(data.createdAt).setHours(new Date(data.createdAt).getHours())).getHours() + "h" + (new Date(data.createdAt).getMinutes().toString().length == 1 ? ("0" + new Date(data.createdAt).getMinutes()) : new Date(data.createdAt).getMinutes().toString() ) }}</p>
            </div>
            <div class="px-6 pt-3 bg-white dark:bg-secondary">
                <p class="text-dark dark:text-white text-lg break-words"><span class="opacity-60">Raison:</span> <span class="font-medium">{{ data?.content }}</span></p>
            </div>
            <div class="px-6 py-3 bg-white dark:bg-secondary flex items-center justify-between gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>

                <div class="flex items-center gap-2">
                    <svg id="dislike_button" @click="likeorDislikePost('dislike', data?.id)" class="w-8 h-8 text-neutral-500 rotate-180 active:scale-95 active:brightness-105 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p id="counter_likes" class="text-dark dark:text-white text-md font-medium">{{ data?.likes ?? 0 }}</p>
                    <svg id="like_button" @click="likeorDislikePost('like', data?.id)" class="w-8 h-8 text-neutral-500 active:scale-95 active:brightness-105 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['data', 'user', 'type'],
    data() {
        return {
            errors: []
        }
    },
    methods: {
        likeorDislikePost(type, id) {
            let likesCounter = this.$el.querySelector('#counter_likes')
            let dislikeButton = this.$el.querySelector('#dislike_button')
            let likeButton = this.$el.querySelector('#like_button')

            if (type == 'like' && !likeButton.classList.contains('!text-emerald-500')) {
                if (dislikeButton.classList.contains('!text-red-500'))
                    this.data.likes = this.data.likes + 1
                this.data.likes = this.data.likes + 1
                likeButton?.classList.add('!text-emerald-500')
                likesCounter?.classList.add('!text-emerald-500')
                dislikeButton?.classList.remove('!text-red-500')
                likesCounter?.classList.remove('!text-red-500')
            } else if (!dislikeButton.classList.contains('!text-red-500') && type != 'like') {
                if (likeButton.classList.contains('!text-emerald-500'))
                    this.data.likes = this.data.likes - 1
                this.data.likes = this.data.likes - 1
                likeButton?.classList.remove('!text-emerald-500')
                likesCounter?.classList.remove('!text-emerald-500')
                dislikeButton?.classList.add('!text-red-500')
                likesCounter?.classList.add('!text-red-500')
            } else {
                if (dislikeButton.classList.contains('!text-red-500'))
                    this.data.likes = this.data.likes + 1
                if (likeButton.classList.contains('!text-emerald-500'))
                    this.data.likes = this.data.likes - 1
                likeButton?.classList.remove('!text-emerald-500')
                likeButton?.classList.remove('!text-red-500')
                dislikeButton?.classList.remove('!text-red-500')
                dislikeButton?.classList.remove('!text-emerald-500')
                likesCounter?.classList.remove('!text-red-500')
                likesCounter?.classList.remove('!text-emerald-500')
            }


            fetch(this.$config.API_URL + `/post/${id}/${type}?userId=`+this.user?.id+'&&userInfos=' + window.localStorage.getItem('userInfos'), {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then(response => response.json())
                .then(async (response) => {
                    if (response?.error) return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
                    this.data.likes = parseInt(response.likedBy?.length) - parseInt(response.dislikedBy?.length)
                    /* if (type == 'like' && !likeButton.classList.contains('!text-emerald-500')) {
                        likeButton?.classList.add('!text-emerald-500')
                        likesCounter?.classList.add('!text-emerald-500')
                        dislikeButton?.classList.remove('!text-red-500')
                        likesCounter?.classList.remove('!text-red-500')
                    } else if (!dislikeButton.classList.contains('!text-red-500') && type != 'like') {
                        likeButton?.classList.remove('!text-emerald-500')
                        likesCounter?.classList.remove('!text-emerald-500')
                        dislikeButton?.classList.add('!text-red-500')
                        likesCounter?.classList.add('!text-red-500')
                    } else {
                        likeButton?.classList.remove('!text-emerald-500')
                        likeButton?.classList.remove('!text-red-500')
                        dislikeButton?.classList.remove('!text-red-500')
                        dislikeButton?.classList.remove('!text-emerald-500')
                        likesCounter?.classList.remove('!text-red-500')
                        likesCounter?.classList.remove('!text-emerald-500')
                    } */
                })
                .catch(async e => {
                    if (type == 'like' && !likeButton.classList.contains('!text-emerald-500')) {
                        likeButton?.classList.add('!text-emerald-500')
                        likesCounter?.classList.add('!text-emerald-500')
                        dislikeButton?.classList.remove('!text-red-500')
                        likesCounter?.classList.remove('!text-red-500')
                    } else if (!dislikeButton.classList.contains('!text-red-500') && type != 'like') {
                        likeButton?.classList.remove('!text-emerald-500')
                        likesCounter?.classList.remove('!text-emerald-500')
                        dislikeButton?.classList.add('!text-red-500')
                        likesCounter?.classList.add('!text-red-500')
                    } else {
                        likeButton?.classList.remove('!text-emerald-500')
                        likeButton?.classList.remove('!text-red-500')
                        dislikeButton?.classList.remove('!text-red-500')
                        dislikeButton?.classList.remove('!text-emerald-500')
                        likesCounter?.classList.remove('!text-red-500')
                        likesCounter?.classList.remove('!text-emerald-500')
                    }
                    return this.errors.push({message: "Impossible de réaliser l'action", color: "danger"})
                })
        },
        closePopupInfos: function () {
            this.holded = false
        }
    },
    mounted() {
        this.data.likes = parseInt(this.data.likedBy?.length) - parseInt(this.data.dislikedBy?.length)
        let likesCounter = this.$el.querySelector('#counter_likes')
        let dislikeButton = this.$el.querySelector('#dislike_button')
        let likeButton = this.$el.querySelector('#like_button')

        let Localuser = JSON.parse(window.localStorage.getItem('user'))
        if (this.data.likedBy.find(u=>u.id == Localuser?.id)) {
            likeButton?.classList.add('!text-emerald-500')
            likesCounter?.classList.add('!text-emerald-500')
            dislikeButton?.classList.remove('!text-red-500')
            likesCounter?.classList.remove('!text-red-500')
        } else if (this.data.dislikedBy.find(u=>u.id == Localuser?.id)) {
            likeButton?.classList.remove('!text-emerald-500')
            likesCounter?.classList.remove('!text-emerald-500')
            dislikeButton?.classList.add('!text-red-500')
            likesCounter?.classList.add('!text-red-500')
        }
    },
}
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>


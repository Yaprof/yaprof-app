<template>
    <div id="sidebar" :class="(isOpen  ? 'translate-x-0 shadow-xl' : '-translate-x-full') + ' h-screen bg-white dark:bg-secondary fixed top-0 left-0 w-72 flex flex-col justify-between items-center z-[99] pb-5 transform-gpu transition-all duration-200'">
        <div class="w-full h-fit min-h-[11.5rem] backdrop-blur-xl overflow-hidden bg-dark dark:bg-light relative pt-10">
            <img class="absolute top-0 left-0 h-full w-full object-cover blur-lg scale-150 brightness-110 dark:brightness-90" :src="user.profile?.pp" />
            <div class="flex flex-col p-5">
                <NuxtLink :to="'/user/' + user.id" class="z-50 !bg-transparent">
                    <img onerror="this.onerror=null;this.src='/icons/icon_48x48.png';"  class="mb-2 h-12 w-12 object-cover z-10 rounded-full object-center" :src="user.profile?.pp || '/icons/icon_48x48.png'" />
                </NuxtLink>
                <h1 class="text-lg text-white z-50 font-medium">{{ user.name }}</h1>
                <div class="flex items-center gap-2 opacity-70">
                    <p class="text-md text-white z-50 whitespace-nowrap">{{ user.class }}</p>
                    <p class="text-md text-white z-50">-</p>
                    <p class="text-md text-white z-50 whitespace-nowrap truncate">{{ user.establishment }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col p-5 h-full justify-start items-center w-full mt-5 gap-3">
            <NuxtLink to="/" class="flex items-center gap-3.5 w-full px-5 py-2 bg-opacity-30 dark:bg-opacity-20 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-95">
                    <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                </svg>
                <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Absences</p>
            </NuxtLink>
            <NuxtLink to="/cantine" class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-95">
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                    <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                </svg>
                <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Cantine</p>
            </NuxtLink>
            <NuxtLink to="/shop" class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-9">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>

                <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Boutique</p>
            </NuxtLink>
            <NuxtLink to="/admin/users" v-if="[50, 99].includes(user.role)" class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-9">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                </svg>
                <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Users</p>
            </NuxtLink>
            <div class="w-[90%] h-0.5 bg-light dark:bg-dark"></div>
            <NuxtLink to="/params" class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-95">
                    <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Paramètres</p>
            </NuxtLink>
        </div>
        <div class="flex flex-col w-full p-5">
            <div class="flex items-center gap-3.5 w-full px-5 py-2 rounded-full cursor-pointer group bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-slate-400 group-active:scale-9">
                <path d="M4.464 3.162A2 2 0 016.28 2h7.44a2 2 0 011.816 1.162l1.154 2.5c.067.145.115.291.145.438A3.508 3.508 0 0016 6H4c-.288 0-.568.035-.835.1.03-.147.078-.293.145-.438l1.154-2.5z" />
                <path fill-rule="evenodd" d="M2 9.5a2 2 0 012-2h12a2 2 0 110 4H4a2 2 0 01-2-2zm13.24 0a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V9.5zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V9.5a.75.75 0 00-.75-.75h-.01zM2 15a2 2 0 012-2h12a2 2 0 110 4H4a2 2 0 01-2-2zm13.24 0a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                </svg>

                <div class="flex items-center justify-between gap-2 w-full">
                    <p class="text-lg text-slate-600 dark:text-slate-400 z-50 font-medium w-full">Services</p>
                    <p :class="(isOnline && errors.length < 1 ? 'bg-[#4AFF9321] text-emerald-400 dark:text-emerald-500' : 'bg-light text-slate-400 dark:text-slate-400') +' text-md z-50 w-full whitespace-nowrap truncate rounded-full bg-opacity-30 flex items-center justify-center py-1'">{{ isOnline && errors.length < 1 ? 'En ligne' : 'Hors ligne' }}</p>
                </div>
            </div>
            <a class="text-slate-600 dark:text-slate-600 w-full px-5 pt-3" href="https://docs.yaprof.fr/documents/politiques-et-legalite" target="_blank">Politiques et conditions</a>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            default: {pp: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
        },
        errors: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            touchStartX: 0,
            touchEndX: 0,
            isOnline: false
        }
    },
    methods: {
        closeSidebar(event) {
            if (!event.target.classList.contains('sidebar-toggle'))
                this.$emit('close-sidebar');
        },
        touchStart(event) {
            this.touchStartX = event.touches[0].clientX;
        },
        touchMove(event) {
            this.touchEndX = event.touches[0].clientX;
        },
        touchEnd() {
            // Check if swipe direction is to the left
            if (this.touchEndX < this.touchStartX) {
                this.$emit('close-sidebar');
            }
        }
    },
    beforeRouteLeave() {
        this.isOpen = false
    },
    beforeDestroy() {
        this.isOpen = false
        document.removeEventListener('click', this.closeSidebar);
        document.removeEventListener('touchstart', this.touchStart);
        document.removeEventListener('touchmove', this.touchMove);
        document.removeEventListener('touchend', this.touchEnd);
    },
    mounted() {
        this.isOnline = navigator?.onLine || false

        document.addEventListener('click', this.closeSidebar);
        document.addEventListener('touchstart', this.touchStart);
        document.addEventListener('touchmove', this.touchMove);
        document.addEventListener('touchend', this.touchEnd);

        window.addEventListener("offline", (e) => this.isOnline = false);
        window.addEventListener("online", (e) => this.isOnline = true);
    },
}
</script>

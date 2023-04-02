<template>
    <div id="sidebar" class="h-screen bg-white dark:bg-secondary fixed top-0 left-0 w-72 flex flex-col justify-between items-center -translate-x-full z-[98]">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="w-full h-fit min-h-[9rem] backdrop-blur-xl overflow-hidden">
            <img class="absolute top-0 left-0 h-full w-full object-cover blur-lg scale-150 brightness-110 dark:brightness-90" :src="userInfos.profile.pp" />
            <div class="flex flex-col p-5">
                <img class="mb-2 h-12 w-12 object-cover z-10 rounded-full object-center" :src="userInfos.profile.pp" />
                <p class="text-lg text-white z-50 font-medium">{{ userInfos.name }}</p>
                <div class="flex items-center gap-2 opacity-70">
                    <ClientOnly>
                        <p class="text-md text-white z-50 whitespace-nowrap">{{ userInfos.class }}</p>
                        <p class="text-md text-white z-50">-</p>
                        <p class="text-md text-white z-50 whitespace-nowrap truncate">{{ userInfos.establishment }}</p>
                    </ClientOnly>
                </div>
            </div>
        </div>
        <div class="flex flex-col p-5 h-full justify-start items-center w-full mt-5 gap-3">
            <NuxtLink to="/" class="flex items-center gap-3.5 w-full px-5 py-2 bg-primary bg-opacity-30 dark:bg-opacity-20 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-active:scale-95">
                    <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                </svg>
                <p class="text-lg text-neutral-600 dark:text-neutral-400 z-50 font-medium">Absences</p>
            </NuxtLink>
            <div class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-active:scale-95">
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                    <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                </svg>
                <p class="text-lg text-neutral-600 dark:text-neutral-400 z-50 font-medium">Cantine</p>
            </div>
            <NuxtLink to="/shop" class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-active:scale-9">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>

                <p class="text-lg text-neutral-600 dark:text-neutral-400 z-50 font-medium">Boutique</p>
            </NuxtLink>
            <div class="w-[90%] h-0.5 bg-light dark:bg-dark"></div>
            <div class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-active:scale-95">
                    <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                <p class="text-lg text-neutral-600 dark:text-neutral-400 z-50 font-medium">Paramètres</p>
            </div>
        </div>
        <div class="flex flex-col w-full p-5">
            <div class="flex items-center gap-3.5 w-full px-5 py-2 bg-transparent bg-opacity-30 rounded-full cursor-pointer group">
                <p class="text-md text-neutral-600 dark:text-neutral-300 z-50 font-medium">Version: v1_beta</p>
            </div>
        </div>

       
    </div>
</template>
<script>
import { generatetoken } from '~~/mixins/auth'
import { createUser } from '~/mixins/user.js'
export default {
    data() {
        return {
            generatetoken: generatetoken,
            createUser: createUser,
            userInfos: {profile:{pp: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}},
            errors: []
        }
    },
    mounted() {
        this.userInfos = JSON.parse(window.localStorage.getItem("user"))
        console.log(this.userInfos)

        $(document).ready(function () {
            console.log('SideBar.js loaded');
            $('#sidebar').css('transition', 'all 200ms');

            $('#sidebar-toggle').click(function (event) {
                toggleSideBar()

                $("#sidebar").swipe({
                    swipeStatus:function(event, phase, direction, distance, duration, fingers)
                    {
                        if (phase=="move" && direction =="left") {
                            toggleSideBar()
                        return false;
                        }
                    }
                });
            });
        });

        $(document).mouseup(function (e) {
            if ($(e.target).closest("#sidebar").length === 0 && $(e.target).closest("#sidebar-toggle").length === 0 && $('#sidebar').hasClass('translate-x-0')) {
                toggleSideBar()
            }
        })

        function toggleSideBar() {
            $('#sidebar').toggleClass('translate-x-0');
            $('#sidebar').toggleClass('-translate-x-full');
            $('#sidebar').toggleClass('shadow-xl');
        }
    },
}
</script>

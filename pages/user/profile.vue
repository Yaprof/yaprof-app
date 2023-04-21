<template>
    <div>
        <NuxtLayout>
            <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
            <div class="flex flex-col pb-5">
                <h1 class="text-dark dark:text-white text-3xl font-bold">Profile</h1>
            </div>
            <div>
                <div class="w-full bg-light dark:bg-secondary dark:active:bg-gray-800 rounded-2xl flex flex-col gap-2">
                    <button id="avatar-upload-button" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-2xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all">
                        <div class="flex items-center gap-2">
                            <div class="w-fit h-fit p-2 bg-">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                    <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div class="flex flex-col justify-start">
                                <p class="text-lg font-bold text-left">Changer sa photo</p>
                                <p class="text-sm truncate text-left -mt-1">Utilise une photo de profil différente</p>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        </svg>
                        <input type="file" name="avatar_input" class="hidden" id="avatar_image" accept="image/*" />
                    </button>
                </div>
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
import { updateUser } from '../../mixins/user.js'
export default {
    name: "profile",
    data() {
        return {
            config: { api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL },
            errors: []
        }
    },
    mounted() {
        let config = this.config
        const UPLOAD_BUTTON = window.document.getElementById("avatar-upload-button");
        const FILE_INPUT = window.document.getElementById("avatar_image");

        UPLOAD_BUTTON?.addEventListener("click", () => FILE_INPUT.click());

        FILE_INPUT?.addEventListener("change", event => {
            const file = event.target.files[0];

            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = async () => {
                    if (file.size > 10485760) {
                        this.errors.push({ message: "Impossible de changer la pp", color: "danger" })
                        this.value = "";
                        return;
                    };
                    let user = JSON.parse(window.localStorage.getItem("user"))
                    if (!user || !reader?.result) return this.errors.push({ message: "Impossible de changer la pp", color: "danger" })
                    let userdb = await updateUser(config.api, reader.result)
                    if (!userdb) return this.errors.push({ message: "Image trop lourde", color: "danger" })
                    console.log(userdb)
                    this.errors.push({ message: "Photo de profile changée", color: "success" })
                };
            } catch (e) {
                return this.errors.push({ message: "Image trop lourde", color: "danger" })
            }
        });
    },
}
</script>
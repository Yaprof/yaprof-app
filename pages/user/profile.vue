<template>
    <NuxtLayout>
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="flex flex-col pb-5">
            <h1 class="text-dark dark:text-white text-3xl font-bold">Profile</h1>
        </div>
        <div>
            <button id="avatar-upload-button" class="text-dark text-lg py-3 px-6 rounded-2xl w-full bg-light active:bg-gray-50 cursor-pointer">Changer sa photo</button>
            <input type="file" name="avatar_input" class="hidden" id="avatar_image" accept="image/*" />
        </div>
    </NuxtLayout>

</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
import { updateUser } from '../../mixins/user.js'
export default {
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

        UPLOAD_BUTTON.addEventListener("click", () => FILE_INPUT.click());

        FILE_INPUT.addEventListener("change", event => {
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
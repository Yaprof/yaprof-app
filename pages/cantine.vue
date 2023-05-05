<template>
    <div>
        <NuxtLayout>
            <div>
                <!-- <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Cantine</h1>
                </div> -->
                <div class="flex flex-col gap-5">
                    <div class="w-full h-96 rounded-xl bg-light dark:bg-secondary flex flex-col items-center justify-center relative overflow-hidden">
                        <img v-if="menu && !menu?.error" @click="showVisualizer" class="w-full h-full absolute object-cover" :src="menu?.url" />
                        <Transition name="opacity" mode="out-in">
                            <ImageVisualizer v-if="showImageVisualizer && menu && !menu?.error" :image-src="menu?.url" @close="hideVisualizer" />
                        </Transition>
                        <p v-if="!menu || menu?.error" class="text-slate-500 text-lg">Aucun menu pour cette semaine</p>
                    </div>
                    <p v-if="menu && !menu?.error" class="text-dark dark:text-white text-lg w-full text-center">Cliquez pour visualiser</p>
                    <div class="flex flex-col gap-2">
                        <button v-if="!menu || menu?.error" @click="handleClickUpload" id="menu-upload-button" class="w-full rounded-xl bg-primary py-3.5 px-5 text-dark font-medium text-lg text-center flex items-center gap-1 justify-center active:bg-opacity-50 transition-all"><span>Ajouter le menu ( +10 </span><img  src="~/assets/imgs/icons/coin.svg" class="w-5 h-5 object-cover object-center rounded-full" />)</button>
                        <button v-if="[20, 50, 99].includes(user?.role)" @click="handleClickUpload" class="w-full rounded-xl bg-light dark:bg-secondary py-3.5 px-5 text-dark dark:text-white font-medium text-lg text-center flex items-center justify-center active:bg-opacity-50 transition-all">Remplacer le menu</button>
                        <input @change="handleChange" type="file" name="file" class="hidden" id="menu_image" accept="image/*" />
                    </div>
                </div>
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
import { getMenu, updateMenu } from '~~/mixins/user'
export default {
    data() {
        return {
            user: {},
            menu: null,
            getMenu: getMenu,
            updateMenu: updateMenu,
            config: useRuntimeConfig(),
            showImageVisualizer: false,
        }
    },
    methods: {
        handleChange(event) {
            const file = event.target.files[0];
            try {
                const reader = new FileReader();
                reader.onload = async () => {
                    console.log(reader.result)
                    if (file.size > 10485760) {
                        this.errors.push({ message: "Image trop grande", color: "danger" })
                        this.value = "";
                        return;
                    };
                    let userdb = await updateMenu(this.config.public.API_URL, reader.result)
                    if (!userdb) return this.errors.push({ message: "Impossible de changer le mneu", color: "danger" })
                    this.errors.push({ message: "Menu changé", color: "success" })
                };
                reader.readAsDataURL(file);
            } catch (e) {
                console.log(e)
                return this.errors.push({ message: "Image trop lourde", color: "danger" })
            }
        },
        handleClickUpload(event) {
            let FILE_INPUT = window.document.getElementById("menu_image");
            FILE_INPUT.click()
        },
        showVisualizer() {
            this.showImageVisualizer = true;
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0');
        },
        hideVisualizer() {
            this.showImageVisualizer = false;
        }
    },
    async mounted() {
        this.user = JSON.parse(window.localStorage.getItem('user'))
        this.menu = await this.getMenu(this.config.public.API_URL)
    },
}
</script>
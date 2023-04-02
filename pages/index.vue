<template>
   <NuxtLayout>
        <div @scroll="handleScroll" class="overflow-y-scroll">
            <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
            <Creator />
            <div class="w-full flex items-center justify-evenly">
                <div class="py-3 flex items-center justify-center flex-col gap-2">
                    <p class="text-dark dark:text-white text-lg">Aujourd'hui</p>
                    <div class="w-full px-1"><div class="bg-primary opacity-40 w-full h-[3px] rounded-full"></div></div>
                </div>
                <div class="py-3 flex items-center justify-center flex-col gap-2">
                    <p class="text-dark dark:text-white text-lg">Semaine</p>
                    <div class="w-full px-1"><div class="bg-transparent opacity-40 w-full h-[3px] rounded-full"></div></div>
                </div>
            </div>
            <div class="pt-5 gap-8 flex flex-col overflow-y-scroll">
                <Post v-for="abs in absences" :key="abs" :data="abs"></Post>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<script>
export default {
/*     layout: 'main', */
    data() {
        return {
            absences: [],
            errors: [],
        }
    },
    methods: {
        getDbFeed: function () {
            fetch(this.$config.API_URL + "/feed", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(async (response) => {
                this.absences = response
            }).catch(e => {
                console.log(this.errors)
                this.errors.push({message: "Impossible de charger le feed", color: "danger"})
                return
            })
        },
        handleScroll(e) {
            console.log(e.target.scrollTo)
            if (e.target.scrollTop === 0) {
                this.$emit("refresh");
            }
        }
    },
    mounted() {
        this.getDbFeed()
        let thos = this
   /*      console.log( document.querySelector('body'))
        $(window).scroll(function (e) {
            console.log($(e.target).scrollTop())
            if ($(e.target).scrollTop() === 0) {
                console.log('top')
                refresh()
            }
        }); */

        window.addEventListener("scroll", function (e) {
            if ($(e.target).scrollTop() === 0) {
                console.log(thos)
                thos.getDbFeed()
            }
        })
    },

}
</script>
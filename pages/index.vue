<template>
    <NuxtLayout name="main">
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
        <div class="pt-5 gap-8 flex flex-col">
            <Post v-for="abs in absences" :key="abs" :data="abs"></Post>
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
    layout: 'main',
    data: () => ({
        base_url: "http://localhost:8080",
        absences: [
                {
                    prof: "Mme. DONNATI",
                    time: new Date("2022-04-22 8:22:23").getHours() + "h" + new Date("2022-04-22 8:22:23").getMinutes(),
                    reason: "A chaque fois que il y a la grève, elle n'est pas présente",
                    score: -5,
                    author_id: 1,
                    color: "#ff0000"
                },
                {
                    prof: "Mme. CAPOLONGO",
                    time: new Date("2022-04-22 10:34:23").getHours() + "h" + new Date("2022-04-22 8:22:23").getMinutes(),
                    reason: "A chaque fois que il y a la grève, elle n'est pas présente",
                    score: 14,
                    author_id: 1,
                    color: "#1BA419"
                }
            ],
    }),
     methods: {
        getDbFeed: function () {
            fetch(this.base_url + "/feed", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then(async (response) => {
                    console.log(response)
                    this.absences = response
                })
                .catch(async e => {
                    return console.log(e)
                })
        },
    },
    mounted() {
        this.getDbFeed()
        console.log(this.absences)
    }
}
</script>
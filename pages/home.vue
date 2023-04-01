<template>
    <NuxtLayout name="main">
        <div class="w-full flex items-center justify-evenly">
            <div class="py-3 flex items-center justify-center flex-col gap-2">
                <p class="text-white dark:text-dark text-lg">Aujourd'hui</p>
                <div class="w-full px-1"><div class="bg-primary opacity-40 w-full h-[3px] rounded-full"></div></div>
            </div>
            <div class="py-3 flex items-center justify-center flex-col gap-2">
                <p class="text-white dark:text-dark text-lg">Semaine</p>
                <div class="w-full px-1"><div class="bg-transparent opacity-40 w-full h-[3px] rounded-full"></div></div>
            </div>
        </div>
        <div class="pt-5 gap-5 flex flex-col">
            <Post v-for="abs in absences" :key="abs" :data="abs"></Post>
        </div>
    </NuxtLayout>

</template>

<script>
export default {
    layout: 'main',
    data: () => ({
      absences: [
            {
                prof: "Mme. DONNETI",
                time: new Date("2022-04-22 8:22:23").getHours() + "h" + new Date("2022-04-22 8:22:23").getMinutes(),
                reason: "A chaque fois que il y a la grève, elle n'est pas présente",
                score: -5,
                author_id: 1
            },
            {
                prof: "Mme. CAPOLONGO",
                time: new Date("2022-04-22 10:34:23").getHours() + "h" + new Date("2022-04-22 8:22:23").getMinutes(),
                reason: "A chaque fois que il y a la grève, elle n'est pas présente",
                score: 14,
                author_id: 1
            }
        ],
    }),
    mounted() {
        console.log(this.absences) 
    }
}
</script>
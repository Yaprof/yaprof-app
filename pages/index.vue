<template>
   <NuxtLayout>
        <Creator />
        <div id="container_div"  class="overflow-y-scroll transition-all">
            <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
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
        getDbFeed: async function () {
            let response = await fetch(this.$config.API_URL + "/feed", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const absences = await response.json();
            if (absences) this.absences = absences
            else this.errors.push({message: "Impossible de charger le feed", color: "danger"})
            return absences
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
                thos.getDbFeed()
            }
        })


        const pStart = { x: 0, y: 0 };
        const pCurrent = { x: 0, y: 0 };
        const main = document.querySelector("#loading_div");
        const container_div = document.querySelector("#container_div")
        let isLoading = false;

        async function loading() {
            if (isLoading) return
            isLoading = true;
            main.style.transform = `translateY(0px)`;
            container_div.style.transform = `translateY(100px)`;
            let infos = await thos.getDbFeed()
            if (infos) {
                setTimeout(function () {
                    main.style.transform = `translateY(-100px)`;
                    container_div.style.transform = `translateY(0)`;
                    isLoading = false;
                    window.scrollTo(0, 0);
                }, 300);
            }else
                return this.errors.push({ message: "Impossible de charger le feed", color: "danger" })
        }

        function swipeStart(e) {
        if (typeof e["targetTouches"] !== "undefined") {
            let touch = e.targetTouches[0];
            pStart.x = touch.screenX;
            pStart.y = touch.screenY;
        } else {
            pStart.x = e.screenX;
            pStart.y = e.screenY;
        }
        }

        function swipeEnd(e) {
        if (document.body.scrollTop === 0 && !isLoading) {
        }
        }

        function swipe(e) {
            if (typeof e["changedTouches"] !== "undefined") {
                let touch = e.changedTouches[0];
                pCurrent.x = touch.screenX;
                pCurrent.y = touch.screenY;
            } else {
                pCurrent.x = e.screenX;
                pCurrent.y = e.screenY;
            }
            let changeY = pStart.y < pCurrent.y ? Math.abs(pStart.y - pCurrent.y) : 0;
            const rotation = changeY < 100 ? changeY * 30 / 100 : 30;
            if (document.body.scrollTop === 0) {
                if (changeY > 100) loading();
            }
        }

        document.addEventListener("touchstart", e => swipeStart(e), false);
        document.addEventListener("touchmove", e => swipe(e), false);
        document.addEventListener("touchend", e => swipeEnd(e), false);
    },

}
</script>
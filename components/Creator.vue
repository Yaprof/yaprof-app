<template>
    <div>
        <div id="popup_creator_toggler" class="fixed bottom-5 right-5 rounded-full w-14 h-14 flex items-center justify-center drop-shadow-lg bg-primaryhover text-dark dark:text-white active:scale-95 active:brightness-105 transition-all cursor-pointer z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>

        <div id="popup_creator_parent" class="absolute top-0 left-0 flex items-center h-screen w-full overflow-hidden z-[-1]">
            <div id="popup_creator" class="flex flex-col items-center bg-light dark:bg-secondary rounded-t-xl shadow-xl h-full w-full mt-20 drop-shadow-lg translate-y-full py-10 px-5 gap-5">
                <div class="w-full flex items-center justify-between">
                    <div onclick="togglePopupCreator()" class="text-primary cursor-pointer text-lg">Annuler</div>
                    <a class="text-dark dark:text-white cursor-pointer text-lg font-medium">Créer un post</a>
                    <div @click="submitPost()" class="text-primary cursor-pointer text-lg">Créer</div>
                </div>

                <div id="form_post" class="flex flex-col rounded-xl bg-neutral-200 px-5 w-full py-3 gap-2">
                    <div class="flex items-center gap-2 relative" v-click-outside="closeProfSearch">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                            <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clip-rule="evenodd" />
                            <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                        </svg>

                        <input v-on:focus="searchProf($event.target)" id="input_prof" autocomplete="off" v-on:keyup="searchProf($event.target)" type="text" class="bg-transparent focus:outline-none w-full" placeholder="Nom du professeur" />
                        <div v-if="prof_content" class="absolute top-[calc(100%+5px)] left-0 rounded-b-xl bg-light dark:bg-secondary shadow-md px-3 py-3 flex flex-col w-full z-[99]">
                            <div @click="selectOption($event.target, prof.name)" v-for="prof in results" :key="prof.name" class="py-2 px-5 hover:bg-primary hover:bg-opacity-30 rounded-full">
                                <p class="text-md text-dark dark:text-white font-medium whitespace-nowrap truncate">{{ prof.name }} ({{ prof.functions[0] }})</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[1px] bg-neutral-300"></div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                            <path fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clip-rule="evenodd" />
                        </svg>

                        <input type="text" id="input_reason" class="bg-transparent focus:outline-none w-full" placeholder="Raison de l'absence" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    data() {
        return {
            loading: false,
            prof_content: false,
            results: [],
            profs: []
        }
    },
    methods: {
        submitPost: function () {
            this.loading = true;
            let form = this.$el.querySelector('#form_post')
            fetch(this.$config.API_URL + '/post', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    content: form.querySelector('#input_reason').value,
                    authorId: JSON.parse(window.localStorage.getItem("user"))?.id,
                    pointer: {
                        name: form.querySelector('#input_prof').dataset.profname,
                        subject: form.querySelector('#input_prof').value.split('(')[1].replace(')', "")
                    }
                })
            }).then(response => response.json())
            .then(async (response) => {
                this.loading = false;
                togglePopupCreator()
                window.location.reload()
                this.profs = response
            })
            .catch(async e => {
                this.loading = false
                return
            })

        },
        searchProf: function (e) {
            this.prof_content = true
            let content = e.parentElement.querySelector('#prof_content')
            this.results = this.profs.filter(s => s.name.toLocaleLowerCase().trim().includes(e.value.toLowerCase().trim())).splice(0, 10)
            if (this.results.length < 1) this.results = [{name:"Aucun résultat", functions:["Aucun"]}]
        },
        selectOption: function (e, profName) {
            this.$el.querySelector('#input_prof').setAttribute("data-profname", profName)
            this.$el.querySelector('#input_prof').value = e.innerHTML
            this.prof_content = false
        },
        closeProfSearch: function () {
            this.prof_content = false
        },
    },
    mounted() {
        fetch(this.$config.PRONOTE_API_URL + '/recipients?token='+window.localStorage.getItem("token"), {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(async (response) => {
            if (response == "notfound" || response == "expired") {
                return await this.generatetoken(window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
            }
            this.profs = response
        })
        .catch(async e => {
            return await this.generatetoken(window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
        })
    },

}
</script>
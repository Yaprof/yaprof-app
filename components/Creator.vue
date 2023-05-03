<template>
    <div>
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div @click="authenticate" id="popup_creator_toggler" class="fixed bottom-0 right-0 p-5 pb-20 z-50 mb-safe">
            <div class="rounded-full w-14 h-14 flex items-center justify-center drop-shadow-md bg-primary dark:bg-primary text-dark active:scale-95 active:brightness-105 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
        <div id="popup_creator_parent" class="fixed top-0 left-0 flex items-center h-screen w-full overflow-hidden z-[-1] transition-all !z-[99] opacity-0 pointer-events-none">
            <div id="popup_creator" class="flex flex-col items-center bg-light dark:bg-secondary rounded-t-xl shadow-xl h-full w-full mt-20 drop-shadow-lg translate-y-full py-10 px-5 gap-5 z-[998] transform-gpu">
                <div class="w-full flex items-center justify-between">
                    <div @click="closePopupCreator()" class="text-emerald-400 cursor-pointer text-lg">Annuler</div>
                    <a class="text-dark dark:text-white cursor-pointer text-lg font-medium">Créer un post</a>
                    <div @click="submitPost()" class="text-emerald-400 cursor-pointer text-lg">Créer</div>
                </div>

                <div id="form_post" class="flex flex-col rounded-xl bg-neutral-200 dark:bg-slate-800 px-5 w-full py-1.5 gap-1">
                    <div class="flex items-center gap-1 relative" v-click-outside="closeProfSearch">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                            <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clip-rule="evenodd" />
                            <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                        </svg>

                        <input v-on:focus="searchProf($event.target)" id="input_prof" autocomplete="off" v-on:keyup="searchProf($event.target)" type="text" class="bg-transparent outline-none border-0 focus:outline-none w-full text-dark dark:text-white rounded focus:ring-0" placeholder="Sélectionner un professeur" />
                        <div v-show="prof_content" class="absolute top-[calc(100%+10px)] left-0 rounded-b-xl bg-neutral-200 dark:bg-dark shadow-lg px-3 py-3 flex flex-col w-full z-[99] transition-all">
                            <div v-for="prof in results" :key="prof.name" class="py-2.5 px-5 hover:bg-primary hover:bg-opacity-30 rounded-full flex items-center gap-1.5">
                                <svg class="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] text-dark dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>
                                <p class="text-md text-dark dark:text-white font-medium whitespace-nowrap truncate" @click="selectOptionProf($event.target, prof.name)">{{ prof.name }} ({{ prof.functions[0]?.replace('&amp;', '&') }})</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[1px] bg-slate-300 dark:bg-slate-700"></div>
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                            <path fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clip-rule="evenodd" />
                        </svg>

                        <select class="bg-transparent focus:outline-none w-full text-dark dark:text-white rounded border-0 focus:ring-0" id="input_reason">
                            <option class="w-full" value="Autre">Autre</option>
                            <option class="w-full" value="Grève">Grève</option>
                            <option class="w-full" value="Maladie">Maladie</option>
                            <option class="w-full" value="Réunion">Réunion</option>
                            <option class="w-full" value="Sortie pédagogique">Sortie pédagogique</option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-col rounded-xl bg-neutral-200 dark:bg-slate-800 px-5 w-full py-3 gap-2">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-dark dark:text-white">
                            <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                        </svg>


                        <select class="bg-transparent focus:outline-none w-full text-dark dark:text-white border-0 rounded focus:ring-0" id="input_date">
                            <option class="w-full" value="today">Aujourd'hui</option>
                            <option class="w-full" value="tomorrow">Demain</option>
                            <option class="w-full" value="next_tomorrow">Après demain</option>
                            <option class="w-full" value="next_next_tomorrow">Après après demain</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios"

export default {
    props: ['user'],
    data() {
        return {
            loading: false,
            prof_content: false,
            results: [],
            profs: [],
            errors: [],
            config: useRuntimeConfig()
        }
    },
    methods: {
        submitPost: function () {
            if (![50, 99].includes(this.user.role) && this.user.posts.filter(post => (new Date(post.createdAt).getFullYear()+'-'+new Date(post.createdAt).getDate()+'-'+(new Date(post.createdAt).getMonth()+1)) == (new Date().getFullYear()+'-'+new Date().getDate()+'-'+(new Date().getMonth()+1))).length > 5) return this.errors.push({ message: "Vous avez déjà posté 5 messages aujourd'hui", color: "danger" })
            if (!window.document.querySelector('#input_prof').dataset?.profname) return this.errors.push({ message: "Veuillez sélectionner un prof", color: "danger" })

            this.loading = true;
            this.closePopupCreator()
            let form = this.$el.querySelector('#form_post')
            fetch(this.config.public.API_URL + '/post?userInfos='+window.localStorage.getItem('userInfos'), {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({
                    content: form.querySelector('#input_reason').value,
                    user: JSON.parse(window.localStorage.getItem("user")),
                    pointer: {
                        name: form.querySelector('#input_prof').dataset.profname,
                        subject: form.querySelector('#input_prof').value.split('(')[1].replace(')', "")
                    },
                    date: window.document.querySelector('#input_date').value
                })
            }).then(response => response.json())
            .then(async (response) => {
                if (response.error) {
                    if (response.error == 'Prof déjà signalé ce jour') return this.errors.push({ message: response.error, color: "danger" })
                }
                this.loading = false;
                window.location.reload()
            })
            .catch(async e => {
                console.log(e)
                this.loading = false
                return this.errors.push({ message: "Impossible de créer le post", color: "danger" })
            })

        },
        searchProf: function (e) {
            this.prof_content = true
            let content = e.parentElement.querySelector('#prof_content')
            this.results = this.profs?.filter(s => s.name.toLocaleLowerCase().trim().includes(e.value.toLowerCase().trim())).splice(0, 10) || []
            if (this.results.length < 1) this.results = [{ name: "Aucun résultat", functions: ["Aucun"] }]
        },
        selectOptionProf: function (e, profName) {
            this.$el.querySelector('#input_prof').setAttribute("data-profname", profName?.replace('&amp;', '&'))
            if (this.$el.querySelector("#input_prof"))
                this.$el.querySelector('#input_prof').value = e.innerHTML?.replace('&amp;', '&')
            this.prof_content = false
        },
        closeProfSearch: function () {
            this.prof_content = false
        },
        closePopupCreator: function () {
            this.$el.querySelector('#popup_creator').classList.remove('z-50')
            this.$el.querySelector('#popup_creator').classList.add('translate-y-full')
            this.$el.querySelector('#popup_creator_parent').classList.remove('bg-dark')
            this.$el.querySelector('#popup_creator_parent').classList.remove('bg-opacity-50')
            this.$el.querySelector('#popup_creator_parent').classList.add('pointer-events-none')
            this.$el.querySelector('#popup_creator_parent').classList.add('opacity-0');
            setTimeout(e => {
                window.document.querySelector('html').classList.remove('overflow-hidden')
                window.document.querySelector('body').classList.remove('overflow-hidden')
            }, 250)
        },
    },
    async mounted() {
        let response = await axios.get(this.config.public.API_URL + '/recipients?userInfos='+window.localStorage.getItem('userInfos'), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
            body: {
                userInfos: window.localStorage.getItem('userInfos')
            }
        }).catch(async e => {
            console.log(e)
            return this.errors.push({ message: "Impossible de se connecter", color: "danger" })
        })

        if (!response.data || response.data.error) return this.errors.push({ message: "Impossible de se connecter", color: "danger" })
        this.profs = response.data.profs
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('userInfos', response.data.userInfos)

        $(document).ready(function () {
            $('#popup_creator').css('transition', 'all 250ms');

            $('#popup_creator_toggler').click(function (event) {
                togglePopupCreator()

                $("#popup_creator").swipe({
                    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
                        if (phase == "move" && direction == "down" && distance >= 100) {
                            togglePopupCreator()
                            return false;
                        }
                    },
                    threshold: 100
                });
            });
        });

        function togglePopupCreator() {
            $('#popup_creator').toggleClass('z-50');
            $('#popup_creator').toggleClass('translate-y-full');
            $('#popup_creator_parent').toggleClass('bg-dark')
            $('#popup_creator_parent').toggleClass('bg-opacity-50')
            $('#popup_creator_parent').toggleClass('pointer-events-none')
            $('#popup_creator_parent').removeClass('opacity-0');
            if ($('#popup_creator').hasClass('translate-y-full'))
                setTimeout(e => {
                    $('html').removeClass('overflow-hidden')
                    $('body').removeClass('overflow-hidden')
                }, 250)
            else {

                $('html').addClass('overflow-hidden')
                $('body').addClass('overflow-hidden')
            }
        }
    },

}
</script>
<template>
    <div class="h-screen w-screen flex flex-col items-center py-20 justify-between">
        <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
        <div class="w-full flex flex-col items-center">
            <img class="w-44" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo-pronote.png/800px-Logo-pronote.png" />
            <div id="form_login" class="flex flex-col items-center gap-3 pt-10 px-5 w-full">
                <div v-click-outside="closeEntSarch" class="flex flex-col gap-1 w-full relative">
                    <label for="ent" class="text-lg text-dark dark:text-white">Établissement</label>
                    <input v-on:focus="searchEnt($event.target)" id="input_ent" autocomplete="off" v-on:keyup="searchEnt($event.target)" type="text" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg focus:rounded-b-none transition-all text-lg" placeholder="Sélectionnez votre établissement" name="ent" />
                    <div v-show="ent_content" class="absolute top-[calc(100%)] left-0 rounded-b-xl bg-white dark:bg-secondary shadow-md px-5 py-5 flex flex-col w-full z-50">
                        <div v-for="cas in results" :key="cas.url" class="py-3.5 px-2 hover:bg-primary hover:bg-opacity-30 border-b dark:border-secondary last:border-b-transparent flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 min-w-[1.25rem]">
                                <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
                            </svg>

                            <ClientOnly>
                                <p class="text-lg text-dark dark:text-white font-medium whitespace-nowrap truncate" @click="selectOption($event.target, cas.url, cas.py)">{{ cas.nomEtab }}</p>
                            </ClientOnly>
                        </div>
                        <div v-if="results.length < 1" class="py-2 px-5 hover:bg-primary hover:bg-opacity-30 flex items-center gap-3">
                            <p class="text-lg text-dark dark:text-white font-medium whitespace-nowrap truncate">Aucun résultat</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <label for="ent" class="text-lg text-dark dark:text-white">Nom d'utilisateur</label>
                    <input id="input_username" type="text" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg text-lg" placeholder="Entrez votre nom d'utilisateur" name="ent" />
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <label for="ent" class="text-lg text-dark dark:text-white">Mot de passe</label>
                    <div class="w-full relative text-dark dark:text-light">
                        <input id="input_password" :type="!eyes ? 'password' : 'text'" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg text-lg text-dark dark:text-light" placeholder="**************" name="ent" />
                        <svg @click="eyes=false" v-if="eyes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 absolute right-5 top-1/3">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <svg @click="eyes=true" v-if="!eyes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 absolute right-5 top-1/3">
                            <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clip-rule="evenodd" />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                        </svg>
                    </div>



                </div>
                <button @click="connect($event.target)" class="mt-5 w-full rounded-xl bg-primary py-3.5 px-5 text-white font-medium text-lg text-center flex items-center justify-center active:bg-opacity-90 transition-all">Se connecter</button>
                <button id="loading-button" class="mt-5 w-full rounded-xl bg-neutral-300 dark:bg-neutral-700 brightness-90 py-3.5 px-5 text-dark dark:text-white font-medium text-lg text-center flex items-center justify-center hidden">Chargement...</button>
            </div>
        </div>
        <div class="text-lg text-dark dark:text-white">Pas de compte ? <a href="mail:yaprof@gmail.com" class="text-primary">Contactez-nous</a></div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
import axios from 'axios';

import { login } from '~/mixins/auth.js'
export default {
    data() {
        return {
            eyes: false,
            ent_content: false,
            results: [],
            ents: [],
            position: null,
            etabs: [],
            errors: [],
            login: login,
            loading: false,
            config: {api: this.$config.API_URL, pronote: this.$config.PRONOTE_API_URL}
        }
    },
    methods: {
        connect: async function (e) {
            let config = this.config
            let loadingButton = window.document?.querySelector('#loading-button')
            e.classList.toggle('hidden')
            loadingButton.classList.toggle('hidden')
            let form = window.document.querySelector('#form_login')
            let logged = await this.login(config, form.querySelector('#input_username').value, form.querySelector('#input_password').value, form.querySelector('#input_ent').dataset.url)
            console.log(logged)
            if (!logged || logged.error) {
                e.classList.remove('hidden')
                loadingButton.classList.add('hidden')
                console.log(logged.error)
                if (logged?.error == "Établissement incorrect") return this.errors.push({ message: "Veuillez séletionner votre établissement", color: "danger" })
                return this.errors.push({ message: "Impossible de se connecter", color: "danger" })
            }

        },
        searchEnt: function (e) {
            this.ent_content = true
            let content = e.parentElement.querySelector('#ent_content')
            this.results = this.etabs.filter(s => s.nomEtab.toLocaleLowerCase().trim().includes(e.value.toLowerCase().trim()))
            if (this.results.length < 1) this.results = []
        },
        selectOption: function (e, url, py) {
            if (e.innerHTML == 'Aucun résultat') return
            this.$el.querySelector('#input_ent').setAttribute("data-url", url)
            this.$el.querySelector('#input_ent').setAttribute("data-ent", py)
            this.$el.querySelector('#input_ent').value = e.innerHTML
            this.ent_content = false
        },
        closeEntSarch: function () {
            this.ent_content = false
        },
        decodeEntities(encodedString) {
            var translate_re = /&(nbsp|amp|quot|lt|gt|Eacute|eacute|Egrave|egrave);/g;
            var translate = {
                "nbsp": " ",
                "amp" : "&",
                "quot": "\"",
                "lt"  : "<",
                "gt"  : ">",
                "Eacute" : "É",
                "eacute" : "é",
                "Egrave" : "È",
                "egrave" : "è",
            };
            return encodedString.replace(translate_re, function(match, entity) {
                return translate[entity];
            }).replace(/&#(\d+);/gi, function(match, numStr) {
                var num = parseInt(numStr, 10);
                return String.fromCharCode(num);
            });
        },
        GetLocation(navigator) {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    let coordinates = position.coords;
                    let lat = coordinates.latitude;
                    let lon = coordinates.longitude;
                    console.log(lat, lon)
                    this.findEstablishments(lat, lon)
                    return position.coords;
                }, error => {
                    console.log(error)
                    this.findEstablishments(43.6832581, 6.9835905)
                    return 43.6832581, 6.9835905
                }, {
                    timeout: 5000,
                    maximumAge: 0,
                })
            } else {
                this.findEstablishments(43.6832581, 6.9835905)
                return 43.6832581, 6.9835905
            }

            this.isLoading = true;
        },
        getPostal(e) {
            let postal = e.detail.value
            if (postal.trim().length != 5) {
                if (postal.trim().length == 0) {
                    this.clearEtabs();
                    this.locationFailed = false;
                }
                return;
            }
            postal = postal.normalize("NFD").replace(/\p{Diacritic}/gu, "");
            if(postal.trim() == "") {
                this.clearEtabs();
                this.locationFailed = false;
                return;
            }
            this.etabs = [];
            this.etabsEmpty = false;
            this.locationFailed = false;
            this.terms = postal;
            this.isLoading = true;

            axios.get('https://cors.api.getpapillon.xyz/https://positionstack.com/geo_api.php?query=france+' + postal, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Allow-Credentials': 'true'
                }
            })
            .then(response => {
                let data = response.data.data;
                let lat = data[0].latitude;
                let lon = data[0].longitude;
                this.foundCity = data[0].locality;
                this.findEstablishments(lat, lon)
            })
            .catch(error => {
                this.isLoading = false;
                this.locationFailed = true;
                displayToast.presentError(`Une erreur s'est produite pour obtenir votre code postal.`, "danger", error.stack)
            })
        },
        findEstablishments(lat, lon) {
            fetch("https://www.index-education.com/swie/geoloc.php", {
                headers: {
                    accept: "*/*",
                    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua":
                    '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "sec-gpc": "1",
                },
                referrer: "https://yaprof.fr/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body:
                    "data=%7B%22nomFonction%22%3A%22geoLoc%22%2C%22lat%22%3A" +
                    lat +
                    "%2C%22long%22%3A" +
                    lon +
                    "%7D",
                method: "POST",
                mode: "cors",
                credentials: "omit",
            })
            .then((response) => response.json())
                .then((data) => {
                this.etabs = data;
                if (this.etabs.length == 0) {
                    this.etabsEmpty = true;
                } else {
                this.etabsEmpty = false;
                }
                if (JSON.stringify(data) == "{}") {
                    this.locationFailed = true;
                } else {
                    this.locationFailed = false;
                }
                // remove all etabs with no URL
                for (let i = 0; i < this.etabs.length; i++) {
                if (this.etabs[i].url == "" || this.etabs[i].url == null) {
                    this.etabs.splice(i, 1);
                }
                }
                // decode etabName html entities
                for (let i = 0; i < this.etabs.length; i++) {
                    this.etabs[i].nomEtab = this.decodeEntities(this.etabs[i].nomEtab);
                }
                setTimeout(() => {
                    this.isLoading = false;
                }, 200);
            })
            .catch((error) => {
                if (this.retries < 3) {
                setTimeout(() => {
                    this.findEstablishments(lat, lon);
                }, 1000);
                this.retries++;
                } else {
                this.isLoading = false;
                this.locationFailed = true;
                }
            })
        }

    },
    async mounted() {
        this.GetLocation(navigator)
        fetch(this.$config.PRONOTE_API_URL + "/infos")
            .then(response => response.json())
            .then(response => {
                return this.ents = response["ent_list"]
            })
    },
}
</script>

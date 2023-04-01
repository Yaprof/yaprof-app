<template>
    <div class="h-screen w-screen flex flex-col items-center py-20 justify-between">
        <div class="w-full flex flex-col items-center">
            <img class="w-44" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo-pronote.png/800px-Logo-pronote.png" />
            <div id="form_login" class="flex flex-col items-center gap-3 pt-10 px-5 w-full">
                <div v-click-outside="closeEntSarch" class="flex flex-col gap-1 w-full relative">
                    <label for="ent" class="text-lg text-dark">Établissement</label>
                    <input v-on:focus="searchEnt($event.target)" id="input_ent" autocomplete="off" v-on:keyup="searchEnt($event.target)" type="text" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg focus:rounded-b-none transition-all text-lg" placeholder="Lycée amiral de grasse" name="ent" />
                    <div v-if="ent_content" class="absolute top-[calc(100%)] left-0 rounded-b-xl bg-white shadow-md px-5 py-5 flex flex-col w-full">
                        <div @click="selectOption($event.target, cas.url, cas.py)" v-for="cas in results" :key="cas.url" class="py-2 px-5 hover:bg-primary hover:bg-opacity-30 rounded-full">
                            <p class="text-lg text-dark dark:text-white font-medium">{{ cas.nomEtab }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <label for="ent" class="text-lg text-dark">Nom d'utilisateur</label>
                    <input id="input_username" type="text" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg text-lg" placeholder="kapibarar.mathieu" name="ent" />
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <label for="ent" class="text-lg text-dark">Mot de passe</label>
                    <input id="input_password" type="password" class="w-full py-3.5 rounded-xl border px-5 placeholder:text-lg text-lg" placeholder="**************" name="ent" />
                </div>
                <button v-if="!this.loading" @click="login()" class="mt-5 w-full rounded-xl bg-primary py-3.5 px-5 text-white font-medium text-lg text-center flex items-center justify-center active:bg-opacity-90 transition-all">Se connecter</button>
                <button v-if="this.loading" class="mt-5 w-full rounded-xl bg-primary brightness-90 py-3.5 px-5 text-white font-medium text-lg text-center flex items-center justify-center">Chargement...</button>
            </div>
        </div>
        <p class="text-lg">Pas de compte ? <a href="#" class="text-primary">Contactez-nous</a></p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
import axios from 'axios';

import { generatetoken } from '~/mixins/auth.js'
import { createUser } from '~/mixins/user.js'
export default {
    data() {
        return {
            ent_content: false,
            results: [],
            config: process.env,
            ents: [],
            base_url: "http://localhost:8000",
            position: null,
            etabs: [],
            generatetoken: generatetoken,
            createUser: createUser,
            loading: false
        }
    },
    methods: {
        login: function () {
            this.loading = true;
            let form = this.$el.querySelector('#form_login')
            let baseurl = this.base_url+'/generatetoken'
            axios.get(`https://api.androne.dev/papillon-v4/redirect.php?url=${encodeURIComponent(form.querySelector('#input_ent').dataset.url)}`)
                .then(async(response) => {
                    let etab = response.data.url.split(".")[1].replace('-', '_')
                    let ent_url = form.querySelector('#input_ent').dataset.url
                    let url = ent_url + (ent_url.includes('eleve.html') ? '' : '/eleve.html')
                    this.generatetoken(url, form.querySelector('#input_username').value, form.querySelector('#input_password').value, etab)
                }).catch(e => {
                    this.loading = false
                })

        },
        searchEnt: function (e) {
            this.ent_content = true
            let content = e.parentElement.querySelector('#ent_content')
            this.results = this.etabs.filter(s => s.nomEtab.toLocaleLowerCase().trim().includes(e.value.toLowerCase().trim())).splice(0, 10)
            if (this.results.length < 1) this.results = [{nomEtab:"Aucun résultat"}]
        },
        selectOption: function (e, url, py) {
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
        async GetLocation(navigator) {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    let coordinates = position.coords;
                    console.log(coordinates)
                    let lat = coordinates.latitude;
                    let lon = coordinates.longitude;
                    console.log(lat, lon)
                    this.findEstablishments(lat, lon)
                    return position.coords;
                }, error=>{console.log(error)}, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0,
                })
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
                console.error("[Get Postal Code]: " + error)
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
                referrer: "http://localhost:3000/",
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
                console.log(data)
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
                console.error("[Find Establishment]: " + error);
                if (this.retries < 3) {
                setTimeout(() => {
                    this.findEstablishments(lat, lon);
                }, 1000);
                this.retries++;
                } else {
                this.isLoading = false;
                this.locationFailed = true;
                displayToast.presentError(
                    `Une erreur s'est produite pour obtenir les établissements à proximité.`,
                    "danger",
                    error.stack
                );
                }
            })
        },

    },
    async mounted() {
        this.GetLocation(navigator)
        fetch(this.base_url + "/infos")
            .then(response => response.json())
            .then(response => {
                return this.ents = response["ent_list"]
            })
    },
}
</script>

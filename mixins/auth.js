import { createUser } from "./user"

export async function generatetoken(config, url, username, password, etab) {
    let urls = JSON.parse(JSON.stringify(config))
    console.log(urls)
    await fetch(urls.pronote + '/generatetoken', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": url,
            "username": username,
            "password": password,
            "ent": etab
        })
    }).then(response => response.json())
        .then(response => {
            if (response.token == false) return response
            console.log(response);
        window?.localStorage.setItem('token', response.token)
        window?.localStorage.setItem('url', url)
        window?.localStorage.setItem('username', username)
        window?.localStorage.setItem('password', password)
        window?.localStorage.setItem('ent', etab)
        getInfos(urls)
        /* if(window.location.pathname == "/auth/login") window.location.replace('/') */
        return true
    })
    .catch(error => { console.log(error);  return false; })
    return true
}

export async function getInfos(config) {
    let urls = JSON.parse(JSON.stringify(config))
    await fetch(urls.pronote + "/user?token="+window.localStorage.getItem("token"), {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(async (response) => {
            console.log(response)
            if (response == "notfound" || response == "expired") {
                console.log(urls)
                let new_token = generatetoken(urls.pronote, window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
                if (!new_token) return false
                return true
            }
            console.log("createUser", urls.api, response.name, response.profile_picture, response.class, response.establishment)
            createUser(urls.api, response.name, response.profile_picture, response.class, response.establishment)
        })
        .catch(async e => {
            console.log(e)
            let new_token = generatetoken(urls.pronote, window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
            if (!new_token) return false
            return true
        })
}
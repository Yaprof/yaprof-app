import { createUser } from "./user"

export async function generatetoken(config, url, username, password, etab) {
    let urls = JSON.parse(JSON.stringify(config))
    let request = await fetch(urls.pronote + '/generatetoken', {
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
    }).catch(error => { console.log(error); return false; })
    let response = await request.json()
    if (response?.token == false || response?.error) return false
    console.log(response)
    window?.localStorage.setItem('token', response.token)
    window?.localStorage.setItem('url', url)
    window?.localStorage.setItem('username', username)
    window?.localStorage.setItem('password', password)
    window?.localStorage.setItem('ent', etab)

    await getInfos(urls)
    return true
}

export async function getInfos(config) {
    let urls = JSON.parse(JSON.stringify(config))
    let request = await fetch(urls.pronote + "/user?token="+window.localStorage.getItem("token"), {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch(async e => {
        let new_token = await generatetoken(urls.pronote, window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
        if (!new_token) return false
    })
    let response = await request.json()
    if (response == "notfound" || response == "expired" || response?.error) {
        let new_token = await generatetoken(urls.pronote, window.localStorage.getItem("url"), window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("ent"))
        if (!new_token) return false
    }

    await createUser(urls.api, response.name, response.profile_picture, response.class, response.establishment, (response.delegue.length < 1 ? false : true))
    return true
}
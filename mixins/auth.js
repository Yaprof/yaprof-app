import { createUser } from "./user"

export async function generatetoken(config, url, username, password, etab) {
    console.log(config, url, username, password, etab)
    let urls = JSON.parse(JSON.stringify(config))
    let request = await fetch(urls.api + '/logingeneratetoken', {
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
    if (!response?.token || !response.userInfos || response?.error) return false
    console.log(response)
    window?.localStorage.setItem('token', response.token)
    window?.localStorage.setItem('userInfos', response.userInfos)

    window.location.href = "/"
    return true
}

export async function getInfos(config) {
    let urls = JSON.parse(JSON.stringify(config))
    let request = await fetch(urls.api + "/getInfos", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    let response = await request.json()
    console.log(response)
    if (!response || response.error) return false

    await createUser(urls.api, response.name, response.profile_picture, response.class, response.establishment, (response.delegue.length < 1 ? false : true))
    return true
}
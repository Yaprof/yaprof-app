import { updateUser } from "./user"
import axios from "axios"

export async function login(config, username, password, ent_url) {
    let request = await fetch(config + '/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "ent_url": ent_url
        })
    }).catch(error => { console.log(error); return false; })
    if (!request) return false
    let response = await request?.json()
    if (!response?.token || !response?.userInfos || response?.error) return response?.error || false
    window?.localStorage.setItem('token', response.token)
    window?.localStorage.setItem('userInfos', response.userInfos)
    window?.localStorage.setItem('user', response.user)

    window.location.href = "/"
    return true
}

export async function getInfos(config) {
    let urls = JSON.parse(JSON.stringify(config))
    let request = await axios.post(urls.api + "/getInfos", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
        body: {
            userInfos: window.localStorage.getItem('userInfos')
        }
    })
    let response = await request.json()
    if (!response || response.error) return false

    await updateUser(urls.api, response.profile_picture, response.name, response.class, response.establishment, (response.delegue.length < 1 ? false : true))
    return true
}
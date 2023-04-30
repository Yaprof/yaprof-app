import axios from "axios"

export async function updateUser(config, pp, name, clas, etab, role) {
    let response = await axios.post(config + '/user/update?userInfos='+window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
        body: {
            name: name,
            pp: pp,
            class: clas,
            etab: etab,
            role: role
        }
    }).catch(error => console.log(error))
    if (response?.data.name) {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        window.location.reload()
    } else
        return false
    return response
}

export async function getUser(config) {
    let response = await axios.get(config + '/user?userInfos='+window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).catch(error => { console.log(error); return false })
    if (!response.data) return false
    if (response?.data?.name) {
        window.localStorage.setItem('user', JSON.stringify(response?.data))
        window.localStorage.setItem('token', response?.data.token)
    } else return false
    return response.data
}

export async function getUsers(config) {
    let response = await axios.get(config + '/admin/users?userInfos='+window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).catch(error => { console.log(error); return false })
    if (!response.data) return false
    return response.data
}

export async function getUserById(config, id) {
    let response = await axios.get(config + '/user/'+id+'?userInfos='+window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).catch(error => { console.log(error); return false })
    if (!response.data) return false
    return response.data
}

export async function getDbFeed(config) {
    let response = await fetch(config + "/feed/"+JSON.parse(window.localStorage.getItem('user'))?.id+"?userInfos="+window.localStorage.getItem('userInfos'), {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
    })
    const absences = await response.json();
    if (!absences) return { error: "Impossible de charger le feed"}
    return absences
}

export async function getAllBadges(config) {
    let response = await fetch(config + "/badges?userInfos=" + window.localStorage.getItem('userInfos'), {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
    })
    const badges = await response.json();
    if (!badges) return { error: "Impossible de charger les badges" }
    return badges
}

export async function buyBadge(config, id) {
    let response = await axios.put(config + "/badge/"+id+"?userInfos=" + window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
    })
    if (!response || !response.data) return { error: "Impossible de charger les badges" }
    return response.data
}

export async function updatebadges(config, userId, new_badges) {
    let response = await axios.post(config + "/badges/"+userId+"?userInfos=" + window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
        body: {
            new_badges: new_badges
        }
    })
    if (!response || !response.data) return { error: "Impossible de mettre à jour les badges" }
    return response.data
}

let feed = false

export async function updateFeed() {
    feed = !feed
    return feed
}
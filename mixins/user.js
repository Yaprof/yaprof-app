import axios from "axios"

export async function updateUser(config, name, pp, clas, etab, role) {
    let response = await axios.post(config + '/user/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            name: name,
            pp: pp,
            class: clas,
            etab: etab,
            role: role
        }
    }).catch(error => console.log(error))
    console.log(response.data)
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
    console.log(response.data)
    if (!response.data) return false
    if (response?.data?.name) {
        console.log(response.data)
        window.localStorage.setItem('user', JSON.stringify(response?.data))
    } else return false
    return response.data
}

export async function createUser(config, name, pp, clas, etab, isDelegue) {
    let role = isDelegue ? 20 : 0
    if (name === "VARGAS LOPEZ Alexandre") role = 99
    if (name === "DELLA-MEA Arthur") role = 50
    let request = await fetch(config + '/user/create', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "pp": pp,
            "class": clas,
            "etab": etab,
            "role": role
        })
    }).catch(error => console.log(error))
    if (!request) return false
    let response = await request.json()
    console.log(response.profile.pp)
    if (response?.name) {
        window.localStorage.setItem('user', JSON.stringify(response))
        window.location.reload()
    } else
        return false
    return response
}

export async function getUser(config, userId) {
    let request = await fetch(config + '/user/'+userId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).catch(error => { console.log(error); return false })
    if (!request) return false
    let response = await request.json()
    response = response[0] ?? response
    if (response?.name) {
        window.localStorage.setItem('user', JSON.stringify(response))
    } else return false
    return response
}
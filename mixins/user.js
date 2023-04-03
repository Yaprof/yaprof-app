
export function createUser(config, name, pp, clas, etab) {
    console.log(config)
    fetch(config + '/user/create', {
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
        })
    }).then(response => response.json())
        .then(response => {
            response = response[0] ?? response
            if (response?.name) {
                window.localStorage.setItem('user', JSON.stringify(response))
                window.location.reload()
            }
            return true
        })
        .catch(error => console.log(error))
    return true

}
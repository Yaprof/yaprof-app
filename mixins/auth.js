export function generatetoken(url, username, password, etab) {
    fetch(this.$config.PRONOTE_API_URL + '/generatetoken', {
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
        window?.localStorage.setItem('token', response.token)
        window?.localStorage.setItem('url', url)
        window?.localStorage.setItem('username', username)
        window?.localStorage.setItem('password', password)
        window?.localStorage.setItem('ent', etab)
        if(window.location.pathname == "/auth/login") window.location.replace('/')
        return true
    })
    .catch(error => { console.log(error);  return false; })
    return true
}
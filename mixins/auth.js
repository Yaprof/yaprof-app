import axios from 'axios'

let baseurl = 'http://localhost:8000'
export function generatetoken(url, username, password, etab) {
    fetch(baseurl + '/generatetoken', {
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
            console.log(response.token)
            window.localStorage.setItem('token', response.token)
            window.localStorage.setItem('url', url)
            window.localStorage.setItem('username', username)
            window.localStorage.setItem('password', password)
            window.localStorage.setItem('ent', etab)
            window.location.replace('/')
            return true
        })
        .catch(error => console.log(error))
    return true
}
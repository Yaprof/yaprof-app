function createPost() {
    let url = "https://0060020p.index-education.net/pronote/eleve.html"

    fetch('http://localhost:8000/generatetoken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": url,
            "username": "zebilamouche",
            "password": "Alexxlebest2007#",
            "ent": "atrium_sud"
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

}
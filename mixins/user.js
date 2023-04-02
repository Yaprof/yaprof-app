
export function createUser(name, pp, clas, etab) {
    fetch(this.$config.API_URL + '/user/create?name='+name+'&&pp='+pp+'&&class='+ clas +'&&=etab'+etab+'&&=pp'+pp, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(response => {
            response = response[0] ?? response
            if (response?.name) {
                window.localStorage.setItem('user', JSON.stringify(response))
            }
            return true
        })
        .catch(error => console.log(error))
    return true

}
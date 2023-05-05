import axios from "axios"

export async function updateUser(config, pp, name, clas, etab, role) {
    console.log(pp.type)
    let response = await axios.post(config + '/user/update?userInfos='+window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            withCredentials: true
        },
        body: {
            name: name,
            pp: {buffer: JSON.stringify(Array.from(new Uint8Array(pp.buffer))), type: pp.type},
            class: clas,
            etab: etab,
            role: role
        }
    }).catch(error => console.log(error))
    if (response?.data.name) {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        window.location.reload()
    } else
        return response
    return response
}

export async function uploadUserPp(config, pp) {
    async function compressImage(file) {
        console.log(file)
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = file;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800;
                const maxHeight = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', 0.7);
            };
        });
    }
    const compressedFile = await compressImage(pp);
    const formData = new FormData();
    formData.append('file', compressedFile);

    const configAxios = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    };

    let response = await axios.post(config + '/user/upload?userInfos='+window.localStorage.getItem('userInfos'), formData, configAxios).catch(error => console.log(error))
    window.location.reload()
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

export async function changeBanUser(config, userId) {
    let response = await axios.post(config + "/user/"+userId+"/ban?userInfos=" + window.localStorage.getItem('userInfos'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
    })
    if (!response || !response.data) return { error: "Impossible de bannir l'utilisateur" }
    return response.data
}

let feed = false

export async function updateFeed() {
    feed = !feed
    return feed
}
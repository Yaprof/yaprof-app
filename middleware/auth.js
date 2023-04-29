import pkg from '~/package.json'

export default defineNuxtRouteMiddleware((to, from) => {
    try {
       /*  if (!window.matchMedia('(display-mode: standalone)').matches) {
            return window.location.replace('/howitswork')
        } */

        let isAuth = (window?.localStorage.getItem('token') && window?.localStorage.getItem('userInfos') && window?.localStorage.getItem('user')) ? true : false
        if (isAuth == false && to.path !== '/auth/login') {
            return window.location.replace('/auth/login')
        } else if (to.path === '/auth/login' && isAuth == true) {
            if (window?.localStorage.getItem('version') !== pkg['version']) 
                window.location.replace('/changelog')
            return
        } else {
            if (window?.localStorage.getItem('version') !== pkg['version'] && isAuth == true) 
                window.location.replace('/changelog')
        }
    } catch (e) {
        return
    }
})
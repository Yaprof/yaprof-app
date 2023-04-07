export default defineNuxtRouteMiddleware((to, from) => {
    try {
        /* if (!window.matchMedia('(display-mode: standalone)').matches && /^iP|MacIntel/.test(navigator.platform)) {
            return navigateTo('/howitswork')
        } */

        let isAuth = (window?.localStorage.getItem('token') && window.localStorage.getItem('username') && window.localStorage.getItem('password') && window.localStorage.getItem('ent') && window.localStorage.getItem('url') && window.localStorage.getItem('user')) ? true : false
        if (isAuth == false && to.path !== '/auth/login') {
            return navigateTo('/auth/login')
        }else if (to.path === '/auth/login' && isAuth == true) {
            return navigateTo('/')
        }
    } catch (e) {
        return
    }
})
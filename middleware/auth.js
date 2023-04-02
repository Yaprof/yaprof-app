export default defineNuxtRouteMiddleware((to, from) => {
    try {
        let isAuth = (window?.localStorage.getItem('token') && window.localStorage.getItem('username') && window.localStorage.getItem('password') && window.localStorage.getItem('ent') && window.localStorage.getItem('url') && window.localStorage.get('user')) ? true : false
        console.log(from.path)
        if (isAuth == false && to.path !== '/auth/login') {
            return navigateTo('/auth/login')
        }else if (to.path === '/auth/login' && isAuth == true) {
            return navigateTo('/')
        }
    } catch (e) {
        return
    }
})
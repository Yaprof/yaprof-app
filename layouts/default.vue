<template>
  <div>
    <NavBar />
    <SideBar />
    <div id="loading_div" class="pt-6 pb-10 mt-10 transition-all z-0 absolute top-0 left-0 w-full" style="transform: translateY(-100px);">
        <div class="w-full h-24 bg-primary flex items-center justify-center pt-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
    </div>
    <div class="px-5 pt-10 pb-10 mt-10 transition-all">
        <slot />
    </div>
 
  </div>
</template>

<!-- <script>
export default {
  layout (context) {
    return 'main'
  }
}
</script> -->
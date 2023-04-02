<template>
  <div>
    <NavBar />
    <SideBar />
    <div class="pt-20 px-5 pb-10 mt-10 h-full">
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
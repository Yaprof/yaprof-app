<template>
  <div>
    <NavBar />
    <SideBar />
    <main class="pt-20 px-5 py-10 h-full">
        <slot />
    </main>
    
  </div>
</template>

<script>
export default {
  layout: 'main',
  // OR
  layout (context) {
    return 'main'
  }
}
</script>
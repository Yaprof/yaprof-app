<template>
  <div>
    <NuxtLayout>
        <VitePwaManifest />
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.5;
}
</style>
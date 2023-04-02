<template>
    <NuxtLayout name="main">

    </NuxtLayout>

</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<script>
export default {
    layout: 'main',
}
</script>
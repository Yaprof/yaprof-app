<template>
    <div>
        <NuxtLayout>
            <div>
                <!-- <div class="flex flex-col pb-5">
                    <h1 class="text-dark dark:text-white text-3xl font-bold">Cantine</h1>
                </div> -->
                <p class="text-dark dark:text-white text-lg">La cantine arrive bientôt !</p>
            </div>
        </NuxtLayout>
    </div>

</template>

<script setup>
definePageMeta({
    middleware: ["auth"]
})
</script>

<script>

</script>
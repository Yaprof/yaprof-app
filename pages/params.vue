<template>
    <NuxtLayout>
        <div>
            <button @click="logout()" class="text-white text-lg py-3 px-6 rounded-2xl w-full bg-primary active:bg-primaryhover">Se déconnecter</button>
        </div>
    </NuxtLayout>

</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
export default {
    methods: {
        logout: function () {
            window.localStorage.clear();
            window.location.reload();
        }
    }
}
</script>
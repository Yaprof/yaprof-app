<template>
    <div class="w-full h-10 flex items-center justify-center fixed top-5 left-0 z-[999]">
        <Transition name="slide-down" mode="out-in">
            <div id="toast"class="w-[80%] h-fit py-2.5 rounded-xl text-white flex items-center px-5 justify-center text-center shadow-md" v-show="!loading" :style="'background-color:'+this.color">{{ data.message }}</div>
        </Transition>
    </div>

</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            color: '#10b981',
            loading: true,
        }
    },
    mounted() {
        this.loading = false

        setTimeout(() => { this.loading = true }, 2000)
        switch (this.data.color) {
            case 'danger':
                this.color = '#ef4444'
                break;
            case 'success':
                this.color = '#10b981'
                break;
            case 'warning':
                this.color = '#f59e0b'
                break;
            default:
                this.color = '#10b981'
                break;
        }
    }
}
</script>

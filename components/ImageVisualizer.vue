<template>
  <div class="image-visualizer" @click="closeVisualizer">
    <img :src="imageSrc" id="img" ref="image" alt="Fullscreen Image" @mousedown="startResize" @mouseup="stopResize" @mousemove="resize">
  </div>
</template>

<script>
export default {
    props: {
        imageSrc: {
        type: String,
        required: true
        }
    },
    data() {
    return {
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    }
    },
    methods: {
        closeVisualizer(event) {
            if (event.target.id == 'img') return
            this.$emit('close');
        },
         startResize(event) {
            this.isResizing = true;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startWidth = this.$refs.image.offsetWidth;
            this.startHeight = this.$refs.image.offsetHeight;
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0');
        },
        stopResize() {
            this.isResizing = false;
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        },
        resize(event) {
            if (this.isResizing) {
                const deltaX = event.clientX - this.startX;
                const deltaY = event.clientY - this.startY;
                const newWidth = this.startWidth + deltaX;
                const newHeight = this.startHeight + deltaY;
                this.$refs.image.style.width = `${newWidth}px`;
                this.$refs.image.style.height = `${newHeight}px`;
            }
        }
    }
}
</script>

<style scoped>
.image-visualizer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
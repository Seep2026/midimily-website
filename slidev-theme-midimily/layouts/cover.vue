<template>
  <MidimilyFrame card-class="mily-cover">
    <slot />
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-cover {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(28px, 4.2vw, 54px);
}

@media (max-width: 900px) {
  .mily-cover {
    padding: 24px;
    justify-content: center;
  }
}
</style>

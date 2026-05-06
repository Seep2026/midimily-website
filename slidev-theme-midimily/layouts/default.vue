<template>
  <MidimilyFrame card-class="mily-default">
    <slot />
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-default {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 4vw, 56px);
}

@media (max-width: 900px) {
  .mily-default {
    padding: 24px;
  }
}
</style>

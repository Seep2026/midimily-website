<template>
  <MidimilyFrame card-class="mily-points">
    <slot />
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-points {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(26px, 3.8vw, 52px) clamp(26px, 4.2vw, 56px);
}

@media (max-width: 900px) {
  .mily-points {
    padding: 22px;
  }
}
</style>

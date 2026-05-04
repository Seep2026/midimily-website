<template>
  <MidimilyFrame card-class="mily-cta" fallback-eyebrow="下一步">
    <slot />
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-cta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 4.5vw, 60px);
}

@media (max-width: 900px) {
  .mily-cta {
    padding: 24px;
  }
}
</style>

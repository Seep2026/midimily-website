<template>
  <MidimilyFrame card-class="mily-statement" fallback-eyebrow="核心判断">
    <slot />
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-statement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 4.5vw, 60px);
}

@media (max-width: 900px) {
  .mily-statement {
    padding: 24px;
  }
}
</style>

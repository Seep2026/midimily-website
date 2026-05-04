<template>
  <MidimilyFrame card-class="mily-process" fallback-eyebrow="路径">
    <div class="mily-process-list">
      <slot />
    </div>
  </MidimilyFrame>
</template>

<script setup>
import MidimilyFrame from '../components/MidimilyFrame.vue';
</script>

<style scoped>
.mily-process {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(26px, 3.8vw, 52px) clamp(26px, 4.2vw, 56px);
}

@media (max-width: 900px) {
  .mily-process {
    padding: 22px;
  }
}
</style>

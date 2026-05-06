<template>
  <MidimilyFrame :card-class="`mily-cta ${densityClass}`">
    <div ref="contentEl" class="mily-cta-content">
      <slot />
    </div>
  </MidimilyFrame>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import MidimilyFrame from '../components/MidimilyFrame.vue';

const contentEl = ref(null);
const densityClass = ref('mily-cta--regular');

const DENSITY_STEPS = ['mily-cta--regular', 'mily-cta--compact', 'mily-cta--dense'];

let resizeRaf = 0;

function getContentLength(element) {
  const rawText = element?.innerText || '';
  return rawText.replace(/\s+/g, '').length;
}

function getBaseDensity(length, pointCount) {
  if (length >= 220 || pointCount >= 6) {
    return 2;
  }

  if (length >= 160 || pointCount >= 5) {
    return 1;
  }

  return 0;
}

function isOverflowing(element) {
  if (!element) {
    return false;
  }

  const card = element.closest('.mily-card');
  if (!card) {
    return false;
  }

  const availableHeight = card.clientHeight - 16;
  return element.scrollHeight > availableHeight;
}

async function applyAdaptiveDensity() {
  const element = contentEl.value;
  if (!element) {
    return;
  }

  const pointCount = element.querySelectorAll('li').length;
  const contentLength = getContentLength(element);
  let densityIndex = getBaseDensity(contentLength, pointCount);

  for (let step = densityIndex; step < DENSITY_STEPS.length; step += 1) {
    densityClass.value = DENSITY_STEPS[step];
    await nextTick();
    if (!isOverflowing(element)) {
      return;
    }
  }

  densityClass.value = DENSITY_STEPS[DENSITY_STEPS.length - 1];
}

function scheduleAdaptiveDensity() {
  if (resizeRaf) {
    cancelAnimationFrame(resizeRaf);
  }

  resizeRaf = requestAnimationFrame(() => {
    void applyAdaptiveDensity();
  });
}

onMounted(() => {
  scheduleAdaptiveDensity();
  window.addEventListener('resize', scheduleAdaptiveDensity, { passive: true });
});

onUnmounted(() => {
  if (resizeRaf) {
    cancelAnimationFrame(resizeRaf);
  }
  window.removeEventListener('resize', scheduleAdaptiveDensity);
});
</script>

<style scoped>
.mily-cta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 4.5vw, 60px);
}

.mily-cta-content {
  min-height: 0;
}

@media (max-width: 900px) {
  .mily-cta {
    padding: 24px;
  }
}
</style>

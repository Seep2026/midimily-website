<template>
  <main class="slidev-layout">
    <header v-if="!isEmbed" class="mily-topbar">
      <a class="mily-brand" href="/">
        <span class="mily-brand-name">米地米立</span>
        <span class="mily-brand-subtitle">企业 AI 落地 · 个体 AI 成长</span>
      </a>

      <nav class="mily-nav" aria-label="站点导航">
        <a href="/#hero">首页</a>
        <a href="/#business">企业服务</a>
        <a href="/#individual">个人成长</a>
        <a href="/#practice">实践</a>
        <a href="/solutions">方案</a>
        <a href="/#contact">联系</a>
      </nav>
    </header>

    <section class="mily-deck-shell">
      <div v-if="!isEmbed" class="mily-deck-toolbar">
        <a class="mily-back" href="/solutions">返回方案库</a>
        <span class="mily-deck-title">{{ title }}</span>
        <span class="mily-page">{{ currentPage }} / {{ total }}</span>
      </div>

      <div v-if="!isEmbed" class="mily-progress" aria-hidden="true">
        <div class="mily-progress-bar" :style="{ width: progress }" />
      </div>

      <section class="mily-slide">
        <div class="mily-card" :class="cardClass">
          <div class="mily-eyebrow">{{ eyebrow || fallbackEyebrow }}</div>
          <slot />
        </div>
      </section>

      <div v-if="!isEmbed" class="mily-controls">
        <button type="button" :disabled="isFirst" @click="goPrevious">上一页</button>
        <button type="button" :disabled="isLast" @click="goNext">下一页</button>
        <span class="mily-controls-hint">可用左右方向键翻页</span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useNav, useSlideContext } from '@slidev/client';

const props = defineProps({
  cardClass: {
    type: String,
    default: 'mily-default',
  },
  fallbackEyebrow: {
    type: String,
    default: '米地米立方案',
  },
});

const nav = useNav();
const { $frontmatter, $slidev } = useSlideContext();

const eyebrow = computed(() => $frontmatter.value?.eyebrow);
const currentPage = computed(() => nav.currentPage.value || 1);
const total = computed(() => nav.total.value || 1);
const progress = computed(() => `${(currentPage.value / total.value) * 100}%`);
const title = computed(() => $slidev.configs?.title || '米地米立方案');
const isFirst = computed(() => currentPage.value <= 1);
const isLast = computed(() => currentPage.value >= total.value);
const isEmbed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1';

function goPrevious() {
  nav.prev();
}

function goNext() {
  nav.next();
}
</script>

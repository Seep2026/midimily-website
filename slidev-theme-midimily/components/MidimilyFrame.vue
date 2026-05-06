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

    <section class="mily-deck-shell" :class="{ 'mily-deck-shell--embed': isEmbed }">
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
import { computed, onMounted, onUnmounted } from 'vue';
import { useNav, useSlideContext } from '@slidev/client';

const props = defineProps({
  cardClass: {
    type: String,
    default: 'mily-default',
  },
});

const nav = useNav();
const { $slidev } = useSlideContext();

const currentPage = computed(() => nav.currentPage.value || 1);
const total = computed(() => nav.total.value || 1);
const progress = computed(() => `${(currentPage.value / total.value) * 100}%`);
const title = computed(() => $slidev.configs?.title || '米地米立方案');
const isFirst = computed(() => currentPage.value <= 1);
const isLast = computed(() => currentPage.value >= total.value);
const isEmbed = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const embedValue = params.get('embed');
  const embeddedValue = params.get('embedded');
  return embedValue === '1' || embeddedValue === '1' || embeddedValue === 'true';
})();

function isContactAnchorHref(rawHref) {
  if (!rawHref || typeof rawHref !== 'string') {
    return false;
  }

  return rawHref === '#contact' || rawHref === '/#contact' || rawHref.endsWith('#contact');
}

function handleEmbedAnchorClick(event) {
  if (!isEmbed) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest('a[href]');
  if (!(anchor instanceof HTMLAnchorElement)) {
    return;
  }

  const rawHref = anchor.getAttribute('href');
  if (!isContactAnchorHref(rawHref)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const targetUrl = `${window.location.origin}/#contact`;
  if (window.top && window.top !== window) {
    window.top.location.href = targetUrl;
    return;
  }

  window.location.href = targetUrl;
}

onMounted(() => {
  if (!isEmbed || typeof document === 'undefined') {
    return;
  }

  document.addEventListener('click', handleEmbedAnchorClick, true);
});

onUnmounted(() => {
  if (typeof document === 'undefined') {
    return;
  }

  document.removeEventListener('click', handleEmbedAnchorClick, true);
});

function goPrevious() {
  nav.prev();
}

function goNext() {
  nav.next();
}
</script>

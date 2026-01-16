<template>
  <div v-if="shouldShowBanner && currentBanner" class="custom-banner-container">
    <div class="custom-banner-box">
      <a
        :href="currentBanner.link"
        target="_blank"
        rel="noopener noreferrer"
        class="custom-banner-link"
        @click="currentBanner && trackBannerClick(currentBanner)"
      >
        <div class="custom-banner-content">
          <div class="custom-banner-title">{{ currentBanner.title }}</div>
          <div class="custom-banner-description">
            {{ currentBanner.description }}
          </div>
        </div>
      </a>
      <div class="custom-banner-controls">
        <button
          v-for="(_, index) in banners"
          :key="index"
          :class="['custom-banner-dot', { active: currentBannerIndex === index }]"
          @click="setBannerIndex(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBanner } from '../composables';

const { banners, currentBanner, setBannerIndex, trackBannerClick, currentBannerIndex, shouldShowBanner } = useBanner();
</script>

<style scoped>
.custom-banner-container {
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 224px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  z-index: 10;
}
.custom-banner-container:hover {
  transform: translateY(-2px);
}
.custom-banner-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.custom-banner-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}
.custom-banner-image-wrapper {
  width: 64px;
  height: 64px;
  margin-right: 12px;
  overflow: hidden;
  border-radius: 6px;
}
.custom-banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.custom-banner-content {
  flex: 1;
}
.custom-banner-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}
.custom-banner-description {
  font-size: 13px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
.custom-banner-label {
  margin-top: 8px;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  text-align: right;
}
.custom-banner-controls {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
.custom-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-text-3);
  margin: 0 4px;
  padding: 0;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.custom-banner-dot.active {
  opacity: 1;
  background-color: var(--vp-c-brand);
}
@media (max-width: 768px) {
  .custom-banner-container {
    position: static;
    width: 100%;
    margin-top: 24px;
  }
}
</style>

<script setup lang="ts">
import type { FlavorSpec } from '../libs/flavors.mts';

defineProps<{ flavor: FlavorSpec }>();
</script>

<template>
  <span class="flavor-row__icon-tile" :style="{ '--flavor-color': flavor.iconColor }">
    <svg class="flavor-row__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path v-for="(d, i) in flavor.icon" :key="i" :d="d" />
    </svg>
  </span>
  <span class="flavor-row__text">
    <span class="flavor-row__title">{{ flavor.label }}</span>
    <span class="flavor-row__desc">{{ flavor.description }}</span>
  </span>
</template>

<style scoped>
.flavor-row__icon-tile {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--flavor-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--flavor-color) 25%, transparent);
  color: var(--flavor-color);
}

.flavor-row__icon {
  width: 100%;
  height: 100%;
}

.flavor-row__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.flavor-row__title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flavor-row__desc {
  font-size: 13px;
  line-height: 1.3;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}
</style>

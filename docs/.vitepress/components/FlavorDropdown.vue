<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

interface FlavorOption {
  value: 'esToolkit' | 'compat';
  label: string;
  description: string;
}

const options: FlavorOption[] = [
  { value: 'esToolkit', label: 'es-toolkit', description: 'Strict Utilities' },
  { value: 'compat', label: 'es-toolkit/compat', description: 'Lodash compatibility' },
];

const { page, lang } = useData();
const router = useRouter();

const localePrefix = computed(() => (lang.value === 'en' ? '' : `/${lang.value}`));

const currentFlavor = computed<FlavorOption>(() => {
  const rel = page.value.relativePath;
  const isCompat =
    rel.includes('reference/compat/') ||
    rel === 'compatibility.md' ||
    rel.endsWith('/compatibility.md');
  return isCompat ? options[1] : options[0];
});

const open = ref(false);
const root = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}

function select(option: FlavorOption) {
  open.value = false;
  if (option.value === currentFlavor.value.value) return;
  const target =
    option.value === 'compat'
      ? `${localePrefix.value}/compatibility`
      : `${localePrefix.value}/intro`;
  router.go(target);
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!open.value || !root.value) return;
  if (!root.value.contains(event.target as Node)) {
    open.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (open.value && event.key === 'Escape') {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown);
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div ref="root" class="flavor-dropdown">
    <button
      type="button"
      class="flavor-dropdown__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="flavor-dropdown__text">
        <span class="flavor-dropdown__title">{{ currentFlavor.label }}</span>
        <span class="flavor-dropdown__desc">{{ currentFlavor.description }}</span>
      </span>
      <svg class="flavor-dropdown__chevron" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </button>

    <div v-if="open" class="flavor-dropdown__panel" role="listbox">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="option"
        :aria-selected="option.value === currentFlavor.value.value"
        class="flavor-dropdown__option"
        @click="select(option)"
      >
        <span class="flavor-dropdown__text">
          <span class="flavor-dropdown__title">{{ option.label }}</span>
          <span class="flavor-dropdown__desc">{{ option.description }}</span>
        </span>
        <svg
          v-if="option.value === currentFlavor.value.value"
          class="flavor-dropdown__check"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.flavor-dropdown {
  position: relative;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
}

.flavor-dropdown__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  text-align: start;
  font: inherit;
  outline: none;
  transition: background-color 0.2s;
}

.flavor-dropdown__trigger:hover,
.flavor-dropdown__trigger[aria-expanded='true'] {
  background: var(--vp-c-default-soft, var(--vp-c-bg-elv));
}

.flavor-dropdown__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.flavor-dropdown__title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flavor-dropdown__desc {
  font-size: 13px;
  line-height: 1.3;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.flavor-dropdown__chevron {
  flex-shrink: 0;
  margin-left: auto;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
}

.flavor-dropdown__panel {
  position: absolute;
  inset-inline: 0;
  top: calc(100% + 6px);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 75%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 10px 30px -10px rgb(0 0 0 / 0.25),
    0 4px 8px -4px rgb(0 0 0 / 0.15);
  animation: flavor-dropdown-in 120ms ease-out;
}

@keyframes flavor-dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flavor-dropdown__option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  text-align: start;
  font: inherit;
  outline: none;
  transition: background-color 0.15s;
}

.flavor-dropdown__option:hover {
  background: var(--vp-c-default-soft, var(--vp-c-bg-soft));
}

.flavor-dropdown__check {
  flex-shrink: 0;
  margin-left: auto;
  width: 14px;
  height: 14px;
  color: var(--vp-c-brand-1);
}
</style>

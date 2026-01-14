<template>
  <div class="benchmark-environment">
    <div v-if="hasEnvironment" class="env-info">
      <div class="env-title">{{ text.prefix }}</div>
      <div class="env-details">
        <div class="env-item">
          <span class="env-label">{{ text.cpu }}:</span>
          <span class="env-value">{{ cpuInfo }}</span>
        </div>
        <div class="env-item">
          <span class="env-label">{{ text.memory }}:</span>
          <span class="env-value">{{ memoryInfo }}</span>
        </div>
        <div class="env-item">
          <span class="env-label">{{ text.node }}:</span>
          <span class="env-value">{{ nodeVersion }}</span>
        </div>
        <div class="env-item">
          <span class="env-label">{{ text.platform }}:</span>
          <span class="env-value">{{ platformInfo }}</span>
        </div>
      </div>
    </div>
    <p v-else>
      {{ text.loading }}
    </p>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import raw from '../../data/benchmark-results.json';

const { lang } = useData();

const i18n = {
  'en-US': {
    prefix: 'Test Environment',
    loading: 'Loading environment information...',
    cores: 'cores',
    cpu: 'CPU',
    memory: 'Memory',
    node: 'Node.js',
    platform: 'Platform',
  },
  zh_hans: {
    prefix: '测试环境',
    loading: '测试环境信息加载中...',
    cores: '核',
    cpu: 'CPU',
    memory: '内存',
    node: 'Node.js',
    platform: '平台',
  },
  ja: {
    prefix: 'テスト環境',
    loading: 'テスト環境情報を読み込み中...',
    cores: 'コア',
    cpu: 'CPU',
    memory: 'メモリ',
    node: 'Node.js',
    platform: 'プラットフォーム',
  },
  ko: {
    prefix: '테스트 환경',
    loading: '테스트 환경 정보를 불러오는 중...',
    cores: '코어',
    cpu: 'CPU',
    memory: '메모리',
    node: 'Node.js',
    platform: '플랫폼',
  },
};

const text = computed(() => {
  return i18n[lang.value] || i18n['en-US'];
});

const environment = raw.environment || {};

const hasEnvironment = computed(() => {
  return environment.cpu || environment.node;
});

const cpuInfo = computed(() => {
  if (!environment.cpu) return '';
  const cores = environment.cpuCores ? ` (${environment.cpuCores} ${text.value.cores})` : '';
  return `${environment.cpu}${cores}`;
});

const memoryInfo = computed(() => {
  return environment.memory || '';
});

const nodeVersion = computed(() => {
  return environment.node || '';
});

const platformInfo = computed(() => {
  return environment.platform || '';
});
</script>

<style scoped>
.benchmark-environment {
  margin: 1.5em 0;
}

.env-info {
  background-color: var(--vp-code-block-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px 20px;
}

.env-title {
  font-weight: 600;
  font-size: 0.95em;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.env-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.env-item {
  display: flex;
  font-size: 0.9em;
  line-height: 1.6;
}

.env-label {
  color: var(--vp-c-text-2);
  min-width: 90px;
}

.env-value {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  flex: 1;
}
</style>

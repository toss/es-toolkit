import { defineConfig } from 'vitest/config';
import { EventEmitter } from 'events';
import packageJson from './package.json';

// EventEmitter의 리스너 최대치를 20으로 설정
EventEmitter.defaultMaxListeners = 20;

export default defineConfig({
  test: {
    isolate: true,
    maxConcurrency: 5,
    name: packageJson.name,
    exclude: ['./benchmarks/**/*', '.yarn/**/*'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
      exclude: ['src/compat/_internal/**/*'],
    },
    watch: false,
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
          include: ['es-toolkit', 'es-toolkit/compat'],
        },
      },
    },
  },
});

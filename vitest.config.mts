import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

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

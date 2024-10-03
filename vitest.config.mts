import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    exclude: ['./benchmarks/**/*', '.yarn/**/*'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
      exclude: ['src/compat/_internal/**/*'],
    },
    watch: false,
  },
});

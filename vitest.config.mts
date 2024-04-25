import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
    },
  },
});
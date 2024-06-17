import { defineConfig } from 'vitest/config';
import packageJson from './package.json';
import codspeedPlugin from '@codspeed/vitest-plugin';

export default defineConfig({
  plugins: [codspeedPlugin],
  test: {
    name: packageJson.name,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
    },
  },
});

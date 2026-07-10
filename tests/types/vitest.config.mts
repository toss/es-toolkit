import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'type-tests',
    watch: false,
    typecheck: {
      enabled: true,
      only: true,
      include: ['**/*.spec-d.ts'],
      tsconfig: './tsconfig.json',
    },
  },
});

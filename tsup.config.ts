import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/*.ts', 'src/*/*.ts', '!**/*.{spec,test,test-d}.*'],
  sourcemap: true,
  dts: true,
  clean: true,
});

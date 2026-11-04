import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { rolldown } from 'rolldown';

describe('main entry point', () => {
  it('bundles orderBy without circular dependencies', async () => {
    const warnings: string[] = [];
    const entry = path.resolve('src/index.ts').replaceAll('\\', '/');
    const bundle = await rolldown({
      input: 'order-by-entry',
      checks: { circularDependency: true },
      plugins: [
        {
          name: 'order-by-entry',
          resolveId(id) {
            if (id === 'order-by-entry') {
              return id;
            }
          },
          load(id) {
            if (id === 'order-by-entry') {
              return `export { orderBy } from ${JSON.stringify(entry)};`;
            }
          },
        },
      ],
      onwarn(warning) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          warnings.push(warning.message);
        }
      },
    });

    try {
      await bundle.generate({ format: 'esm' });
      expect(warnings).toEqual([]);
    } finally {
      await bundle.close();
    }
  });
});

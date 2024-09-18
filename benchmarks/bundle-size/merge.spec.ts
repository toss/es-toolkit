import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('merge bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'merge');
    expect(bundleSize).toMatchInlineSnapshot(`12483`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'merge');
    expect(bundleSize).toMatchInlineSnapshot(`271`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'merge');
    expect(bundleSize).toMatchInlineSnapshot(`4465`);
  });
});

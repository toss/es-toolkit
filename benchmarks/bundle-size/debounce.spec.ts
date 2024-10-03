import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('debounce bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'debounce');
    expect(bundleSize).toMatchInlineSnapshot(`2873`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'debounce');
    expect(bundleSize).toMatchInlineSnapshot(`535`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'debounce');
    expect(bundleSize).toMatchInlineSnapshot(`995`);
  });
});

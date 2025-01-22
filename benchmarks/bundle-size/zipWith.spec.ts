import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('zipWith bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'zipWith');
    expect(bundleSize).toMatchInlineSnapshot(`4185`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'zipWith');
    expect(bundleSize).toMatchInlineSnapshot(`198`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'zipWith');
    expect(bundleSize).toMatchInlineSnapshot(`198`);
  });
});

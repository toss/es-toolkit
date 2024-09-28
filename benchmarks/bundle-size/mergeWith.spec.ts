import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('mergeWith bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'mergeWith');
    expect(bundleSize).toMatchInlineSnapshot(`12487`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'mergeWith');
    expect(bundleSize).toMatchInlineSnapshot(`307`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'mergeWith');
    expect(bundleSize).toMatchInlineSnapshot(`4413`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('lastIndexOf bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'lastIndexOf');
    expect(bundleSize).toMatchInlineSnapshot(`1586`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'lastIndexOf');
    expect(bundleSize).toMatchInlineSnapshot(`375`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('forEach bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'forEach');
    expect(bundleSize).toMatchInlineSnapshot(`5035`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'forEach');
    expect(bundleSize).toMatchInlineSnapshot(`568`);
  });
});

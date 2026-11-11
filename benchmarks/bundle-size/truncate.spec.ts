import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('truncate bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'truncate');
    expect(bundleSize).toMatchInlineSnapshot(`5354`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'truncate');
    expect(bundleSize).toMatchInlineSnapshot(`1019`);
  });
});

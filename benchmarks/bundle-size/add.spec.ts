import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('add bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'add');
    expect(bundleSize).toMatchInlineSnapshot(`1948`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'add');
    expect(bundleSize).toMatchInlineSnapshot(`455`);
  });
});

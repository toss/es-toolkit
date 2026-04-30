import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('chain bundle size', () => {
  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit/iterator', 'chain');
    expect(bundleSize).toMatchInlineSnapshot(`82`);
  });

  it('itertools', async () => {
    const bundleSize = await getBundleSize('itertools', 'chain');
    expect(bundleSize).toMatchInlineSnapshot(`252`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('zipIterable bundle size', () => {
  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit/iterator', 'zipIterable');
    expect(bundleSize).toMatchInlineSnapshot(`167`);
  });

  it('@fxts/core', async () => {
    const bundleSize = await getBundleSize('@fxts/core', 'zip');
    expect(bundleSize).toMatchInlineSnapshot(`6336`);
  });

  it('itertools', async () => {
    const bundleSize = await getBundleSize('itertools', 'izip');
    expect(bundleSize).toMatchInlineSnapshot(`337`);
  });
});

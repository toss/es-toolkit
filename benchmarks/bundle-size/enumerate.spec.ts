import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('enumerate bundle size', () => {
  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit/iterator', 'enumerate');
    expect(bundleSize).toMatchInlineSnapshot(`212`);
  });

  it('@fxts/core', async () => {
    const bundleSize = await getBundleSize('@fxts/core', 'zipWithIndex');
    expect(bundleSize).toMatchInlineSnapshot(`2710`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/cartesianProduct bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { cartesianProduct } from "es-toolkit/fp"; console.log(cartesianProduct)')
    ).toMatchInlineSnapshot(`351`);
  });
});

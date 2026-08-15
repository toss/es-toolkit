import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/orderBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { orderBy } from "es-toolkit/fp"; console.log(orderBy)')
    ).toMatchInlineSnapshot(`463`);
  });
});

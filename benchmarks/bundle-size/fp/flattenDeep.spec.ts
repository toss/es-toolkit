import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flattenDeep bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { flattenDeep } from "es-toolkit/fp"; console.log(flattenDeep)')
    ).toMatchInlineSnapshot(`573`);
  });
});

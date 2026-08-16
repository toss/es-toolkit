import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/xorBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { xorBy } from "es-toolkit/fp"; console.log(xorBy)')
    ).toMatchInlineSnapshot(`529`);
  });
});

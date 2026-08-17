import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/isSubset bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { isSubset } from "es-toolkit/fp"; console.log(isSubset)')
    ).toMatchInlineSnapshot(`179`);
  });
});

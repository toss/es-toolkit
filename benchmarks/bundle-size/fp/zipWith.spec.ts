import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/zipWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { zipWith } from "es-toolkit/fp"; console.log(zipWith)')
    ).toMatchInlineSnapshot(`254`);
  });
});

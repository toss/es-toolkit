import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/xorWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { xorWith } from "es-toolkit/fp"; console.log(xorWith)')
    ).toMatchInlineSnapshot(`399`);
  });
});

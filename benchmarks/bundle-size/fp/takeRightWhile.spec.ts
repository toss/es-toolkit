import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/takeRightWhile bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { takeRightWhile } from "es-toolkit/fp"; console.log(takeRightWhile)')
    ).toMatchInlineSnapshot(`174`);
  });
});

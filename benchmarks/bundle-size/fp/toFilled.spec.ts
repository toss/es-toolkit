import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/toFilled bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { toFilled } from "es-toolkit/fp"; console.log(toFilled)')
    ).toMatchInlineSnapshot(`259`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/xor bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { xor } from "es-toolkit/fp"; console.log(xor)')
    ).toMatchInlineSnapshot(`314`);
  });
});

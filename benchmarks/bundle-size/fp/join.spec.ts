import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/join bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { join } from "es-toolkit/fp"; console.log(join)')
    ).toMatchInlineSnapshot(`78`);
  });
});

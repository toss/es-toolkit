import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/zip bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { zip } from "es-toolkit/fp"; console.log(zip)')
    ).toMatchInlineSnapshot(`275`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/head bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { head } from "es-toolkit/fp"; console.log(head)')
    ).toMatchInlineSnapshot(`98`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/differenceWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { differenceWith } from "es-toolkit/fp"; console.log(differenceWith)')
    ).toMatchInlineSnapshot(`390`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/drop bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { drop } from "es-toolkit/fp"; console.log(drop)')
    ).toMatchInlineSnapshot(`413`);
  });
});

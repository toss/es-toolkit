import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/without bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { without } from "es-toolkit/fp"; console.log(without)')
    ).toMatchInlineSnapshot(`436`);
  });
});

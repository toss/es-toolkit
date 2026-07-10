import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/countBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { countBy } from "es-toolkit/fp"; console.log(countBy)')
    ).toMatchInlineSnapshot(`176`);
  });
});

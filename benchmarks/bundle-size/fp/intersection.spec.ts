import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/intersection bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { intersection } from "es-toolkit/fp"; console.log(intersection)')
    ).toMatchInlineSnapshot(`396`);
  });
});

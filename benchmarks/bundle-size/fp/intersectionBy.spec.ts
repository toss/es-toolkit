import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/intersectionBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { intersectionBy } from "es-toolkit/fp"; console.log(intersectionBy)')
    ).toMatchInlineSnapshot(`490`);
  });
});

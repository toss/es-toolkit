import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/zipObject bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { zipObject } from "es-toolkit/fp"; console.log(zipObject)')
    ).toMatchInlineSnapshot(`149`);
  });
});

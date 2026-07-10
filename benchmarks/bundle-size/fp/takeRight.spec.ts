import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/takeRight bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { takeRight } from "es-toolkit/fp"; console.log(takeRight)')
    ).toMatchInlineSnapshot(`132`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/maxBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { maxBy } from "es-toolkit/fp"; console.log(maxBy)')
    ).toMatchInlineSnapshot(`234`);
  });
});

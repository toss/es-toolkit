import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/unzipWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { unzipWith } from "es-toolkit/fp"; console.log(unzipWith)')
    ).toMatchInlineSnapshot(`255`);
  });
});

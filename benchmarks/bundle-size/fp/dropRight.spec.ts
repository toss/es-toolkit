import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/dropRight bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { dropRight } from "es-toolkit/fp"; console.log(dropRight)')
    ).toMatchInlineSnapshot(`144`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/reverse bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { reverse } from "es-toolkit/fp"; console.log(reverse)')
    ).toMatchInlineSnapshot(`87`);
  });
});

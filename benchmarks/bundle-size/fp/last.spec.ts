import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/last bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { last } from "es-toolkit/fp"; console.log(last)')
    ).toMatchInlineSnapshot(`107`);
  });
});

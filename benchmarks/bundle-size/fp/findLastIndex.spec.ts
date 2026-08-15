import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/findLastIndex bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { findLastIndex } from "es-toolkit/fp"; console.log(findLastIndex)')
    ).toMatchInlineSnapshot(`124`);
  });
});

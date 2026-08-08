import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/at bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { at } from "es-toolkit/fp"; console.log(at)')).toMatchInlineSnapshot(
      `239`
    );
  });
});

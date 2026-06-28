import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/takeWhile bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { takeWhile } from "es-toolkit/fp"; console.log(takeWhile)')).toBe(
      459
    );
  });
});

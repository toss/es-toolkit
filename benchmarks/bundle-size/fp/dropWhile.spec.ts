import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/dropWhile bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { dropWhile } from "es-toolkit/fp"; console.log(dropWhile)')).toBe(
      314
    );
  });
});

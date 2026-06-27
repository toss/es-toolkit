import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/sampleSize bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { sampleSize } from "es-toolkit/fp"; console.log(sampleSize)')).toBe(
      519
    );
  });
});

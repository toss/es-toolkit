import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/difference bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { difference } from "es-toolkit/fp"; console.log(difference)')).toBe(
      397
    );
  });
});

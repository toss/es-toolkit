import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/shuffle bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { shuffle } from "es-toolkit/fp"; console.log(shuffle)')).toBe(204);
  });
});

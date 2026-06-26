import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/sample bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { sample } from "es-toolkit/fp"; console.log(sample)')).toBe(139);
  });
});

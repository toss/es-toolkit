import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/chunkBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { chunkBy } from "es-toolkit/fp"; console.log(chunkBy)')).toBe(210);
  });
});

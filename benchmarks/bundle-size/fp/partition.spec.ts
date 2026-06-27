import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/partition bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { partition } from "es-toolkit/fp"; console.log(partition)')).toBe(
      185
    );
  });
});

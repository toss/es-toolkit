import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/unionWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { unionWith } from "es-toolkit/fp"; console.log(unionWith)')).toBe(
      225
    );
  });
});

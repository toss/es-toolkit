import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/differenceBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { differenceBy } from "es-toolkit/fp"; console.log(differenceBy)')
    ).toBe(435);
  });
});

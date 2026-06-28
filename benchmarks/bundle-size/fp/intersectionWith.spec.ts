import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/intersectionWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { intersectionWith } from "es-toolkit/fp"; console.log(intersectionWith)')
    ).toBe(386);
  });
});

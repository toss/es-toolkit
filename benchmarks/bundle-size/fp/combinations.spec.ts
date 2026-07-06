import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/combinations bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { combinations } from "es-toolkit/fp"; console.log(combinations)')
    ).toBe(440);
  });
});

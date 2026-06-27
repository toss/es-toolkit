import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/findIndex bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { findIndex } from "es-toolkit/fp"; console.log(findIndex)')).toBe(83);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/filter bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { filter } from "es-toolkit/fp"; console.log(filter)')).toBe(320);
  });

  it('lodash/fp/filter', async () => {
    expect(await getBundleSizeFromScript('import filter from "lodash/fp/filter"; console.log(filter)')).toBe(51917);
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { filter } from "remeda"; console.log(filter)')).toBe(391);
  });
});

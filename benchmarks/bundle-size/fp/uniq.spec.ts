import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/uniq bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { uniq } from "es-toolkit/fp"; console.log(uniq)')).toBe(108);
  });

  it('lodash/fp/uniq', async () => {
    expect(await getBundleSizeFromScript('import uniq from "lodash/fp/uniq"; console.log(uniq)')).toBe(51943);
  });

  it('remeda/unique', async () => {
    expect(await getBundleSizeFromScript('import { unique } from "remeda"; console.log(unique)')).toBe(1233);
  });
});

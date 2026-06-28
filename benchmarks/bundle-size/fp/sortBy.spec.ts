import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/sortBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { sortBy } from "es-toolkit/fp"; console.log(sortBy)')).toBe(497);
  });

  it('lodash/fp/sortBy', async () => {
    expect(await getBundleSizeFromScript('import sortBy from "lodash/fp/sortBy"; console.log(sortBy)')).toBe(53390);
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { sortBy } from "remeda"; console.log(sortBy)')).toBe(612);
  });
});

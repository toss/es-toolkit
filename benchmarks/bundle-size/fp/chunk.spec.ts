import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/chunk bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { chunk } from "es-toolkit/fp"; console.log(chunk)')).toBe(286);
  });

  it('lodash/fp/chunk', async () => {
    expect(await getBundleSizeFromScript('import chunk from "lodash/fp/chunk"; console.log(chunk)')).toBe(51712);
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { chunk } from "remeda"; console.log(chunk)')).toBe(607);
  });
});

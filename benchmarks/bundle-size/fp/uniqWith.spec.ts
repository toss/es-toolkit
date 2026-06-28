import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/uniqWith bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { uniqWith } from "es-toolkit/fp"; console.log(uniqWith)')).toBe(331);
  });
});

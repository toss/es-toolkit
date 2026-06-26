import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/groupBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { groupBy } from "es-toolkit/fp"; console.log(groupBy)')).toBe(202);
  });
});

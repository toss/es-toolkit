import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/pick bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { pick } from "es-toolkit/fp"; console.log(pick)')).toBe(180);
  });

  it('lodash/fp/pick', async () => {
    expect(await getBundleSizeFromScript('import pick from "lodash/fp/pick"; console.log(pick)')).toBe(51825);
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { pick } from "remeda"; console.log(pick)')).toBe(353);
  });
});

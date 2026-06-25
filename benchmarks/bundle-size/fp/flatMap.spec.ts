import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flatMap bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { flatMap } from "es-toolkit/fp"; console.log(flatMap)')).toBe(556);
  });

  it('lodash/fp/flatMap', async () => {
    expect(await getBundleSizeFromScript('import flatMap from "lodash/fp/flatMap"; console.log(flatMap)')).toBe(52042);
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { flatMap } from "remeda"; console.log(flatMap)')).toBe(434);
  });
});

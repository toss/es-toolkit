import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/multiply bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { multiply } from "es-toolkit/fp"; console.log(multiply)')).toBe(72);
  });

  it('lodash/fp/multiply', async () => {
    expect(await getBundleSizeFromScript('import multiply from "lodash/fp/multiply"; console.log(multiply)')).toBe(
      51542
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { multiply } from "remeda"; console.log(multiply)')).toBe(301);
  });
});

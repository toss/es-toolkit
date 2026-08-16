import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/compact bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { compact } from "es-toolkit/fp"; console.log(compact)')
    ).toMatchInlineSnapshot(`391`);
  });
});

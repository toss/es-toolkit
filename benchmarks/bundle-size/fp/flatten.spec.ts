import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flatten bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { flatten } from "es-toolkit/fp"; console.log(flatten)')
    ).toMatchInlineSnapshot(`587`);
  });
});

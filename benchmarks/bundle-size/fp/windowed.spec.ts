import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/windowed bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { windowed } from "es-toolkit/fp"; console.log(windowed)')
    ).toMatchInlineSnapshot(`705`);
  });
});

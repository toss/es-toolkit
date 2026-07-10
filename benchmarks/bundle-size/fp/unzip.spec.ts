import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/unzip bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { unzip } from "es-toolkit/fp"; console.log(unzip)')
    ).toMatchInlineSnapshot(`269`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/omit bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { omit } from "es-toolkit/fp"; console.log(omit)')
    ).toMatchInlineSnapshot(`164`);
  });

  it('lodash/fp/omit', async () => {
    expect(await getBundleSizeFromScript('import omit from "lodash/fp/omit"; console.log(omit)')).toMatchInlineSnapshot(
      `52210`
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { omit } from "remeda"; console.log(omit)')).toMatchInlineSnapshot(
      `471`
    );
  });
});

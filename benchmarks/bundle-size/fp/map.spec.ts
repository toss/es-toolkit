import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/map bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { map } from "es-toolkit/fp"; console.log(map)')
    ).toMatchInlineSnapshot(`314`);
  });

  it('lodash/fp/map', async () => {
    expect(await getBundleSizeFromScript('import map from "lodash/fp/map"; console.log(map)')).toMatchInlineSnapshot(
      `51945`
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { map } from "remeda"; console.log(map)')).toMatchInlineSnapshot(
      `359`
    );
  });
});

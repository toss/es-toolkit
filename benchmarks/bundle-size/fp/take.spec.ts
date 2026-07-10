import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/take bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { take } from "es-toolkit/fp"; console.log(take)')
    ).toMatchInlineSnapshot(`413`);
  });

  it('lodash/fp/take', async () => {
    expect(await getBundleSizeFromScript('import take from "lodash/fp/take"; console.log(take)')).toMatchInlineSnapshot(
      `51388`
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { take } from "remeda"; console.log(take)')).toMatchInlineSnapshot(
      `443`
    );
  });
});

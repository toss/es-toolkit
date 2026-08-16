import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/unionBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { unionBy } from "es-toolkit/fp"; console.log(unionBy)')
    ).toMatchInlineSnapshot(`252`);
  });
});

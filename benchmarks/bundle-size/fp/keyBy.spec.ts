import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/keyBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { keyBy } from "es-toolkit/fp"; console.log(keyBy)')
    ).toMatchInlineSnapshot(`166`);
  });
});

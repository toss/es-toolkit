import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/dropRightWhile bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { dropRightWhile } from "es-toolkit/fp"; console.log(dropRightWhile)')
    ).toMatchInlineSnapshot(`168`);
  });
});

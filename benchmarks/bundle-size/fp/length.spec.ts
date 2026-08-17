import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/length bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { length } from "es-toolkit/fp"; console.log(length)')
    ).toMatchInlineSnapshot(`76`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flowAsync bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { flowAsync } from "es-toolkit/fp"; console.log(flowAsync)')
    ).toMatchInlineSnapshot(`194`);
  });
});

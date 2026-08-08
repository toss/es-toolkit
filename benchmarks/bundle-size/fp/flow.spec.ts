import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flow bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { flow } from "es-toolkit/fp"; console.log(flow)')
    ).toMatchInlineSnapshot(`873`);
  });

  it('lodash/fp/flow', async () => {
    expect(await getBundleSizeFromScript('import flow from "lodash/fp/flow"; console.log(flow)')).toMatchInlineSnapshot(
      `51819`
    );
  });
});

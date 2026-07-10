import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/add bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { add } from "es-toolkit/fp"; console.log(add)')
    ).toMatchInlineSnapshot(`72`);
  });

  it('lodash/fp/add', async () => {
    expect(await getBundleSizeFromScript('import add from "lodash/fp/add"; console.log(add)')).toMatchInlineSnapshot(
      `51537`
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { add } from "remeda"; console.log(add)')).toMatchInlineSnapshot(
      `301`
    );
  });
});

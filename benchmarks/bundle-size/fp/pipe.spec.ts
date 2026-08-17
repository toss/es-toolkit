import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/pipe bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(
      await getBundleSizeFromScript('import { pipe } from "es-toolkit/fp"; console.log(pipe)')
    ).toMatchInlineSnapshot(`717`);
  });

  it('lodash/fp/pipe', async () => {
    expect(await getBundleSizeFromScript('import pipe from "lodash/fp/pipe"; console.log(pipe)')).toMatchInlineSnapshot(
      `51856`
    );
  });

  it('remeda', async () => {
    expect(await getBundleSizeFromScript('import { pipe } from "remeda"; console.log(pipe)')).toMatchInlineSnapshot(
      `908`
    );
  });
});

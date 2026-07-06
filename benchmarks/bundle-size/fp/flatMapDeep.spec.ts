import { describe, expect, it } from 'vitest';
import { getBundleSizeFromScript } from '../utils/getBundleSize';

describe('fp/flatMapDeep bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSizeFromScript('import { flatMapDeep } from "es-toolkit/fp"; console.log(flatMapDeep)')).toBe(
      642
    );
  });
});

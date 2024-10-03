import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('isEqual bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'isEqual');
    expect(bundleSize).toMatchInlineSnapshot(`12872`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'isEqual');
    expect(bundleSize).toMatchInlineSnapshot(`2952`);
  });
});

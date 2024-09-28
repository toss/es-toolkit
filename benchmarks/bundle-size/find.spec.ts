import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('find bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'find');
    expect(bundleSize).toMatchInlineSnapshot(`17334`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'find');
    expect(bundleSize).toMatchInlineSnapshot(`5376`);
  });
});

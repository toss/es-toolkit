import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('zip bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'zip');
    expect(bundleSize).toMatchInlineSnapshot(`3961`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'zip');
    expect(bundleSize).toMatchInlineSnapshot(`221`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'zip');
    expect(bundleSize).toMatchInlineSnapshot(`478`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('escape bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'escape');
    expect(bundleSize).toMatchInlineSnapshot(`1886`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'escape');
    expect(bundleSize).toMatchInlineSnapshot(`145`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'escape');
    expect(bundleSize).toMatchInlineSnapshot(`348`);
  });
});

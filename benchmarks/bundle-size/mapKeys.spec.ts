import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('mapKeys bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'mapKeys');
    expect(bundleSize).toMatchInlineSnapshot(`16649`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'mapKeys');
    expect(bundleSize).toMatchInlineSnapshot(`138`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'mapKeys');
    expect(bundleSize).toMatchInlineSnapshot(`1355`);
  });
});

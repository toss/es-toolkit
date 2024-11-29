import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('flow bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'flow');
    expect(bundleSize).toMatchInlineSnapshot(`6174`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'flow');
    expect(bundleSize).toMatchInlineSnapshot(`162`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'flow');
    expect(bundleSize).toMatchInlineSnapshot(`436`);
  });
});

import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('findKey bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'findKey');
    expect(bundleSize).toMatchInlineSnapshot(`16489`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'findKey');
    expect(bundleSize).toMatchInlineSnapshot(`86`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'findKey');
    expect(bundleSize).toMatchInlineSnapshot(`6496`);
  });
});

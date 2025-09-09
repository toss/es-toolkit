import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('camelCase bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'camelCase');
    expect(bundleSize).toMatchInlineSnapshot(`7293`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'camelCase');
    expect(bundleSize).toMatchInlineSnapshot(`370`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'camelCase');
    expect(bundleSize).toMatchInlineSnapshot(`650`);
  });
});

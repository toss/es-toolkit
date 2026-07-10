import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('cloneDeep bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'cloneDeep');
    expect(bundleSize).toMatchInlineSnapshot(`14741`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'cloneDeep');
    expect(bundleSize).toMatchInlineSnapshot(`3400`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'cloneDeep');
    expect(bundleSize).toMatchInlineSnapshot(`3840`);
  });
});

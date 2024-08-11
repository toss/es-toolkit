import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('chunk bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'chunk');
    expect(bundleSize).toMatchInlineSnapshot(`3153`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'chunk');
    expect(bundleSize).toMatchInlineSnapshot(`238`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'chunk');
    expect(bundleSize).toMatchInlineSnapshot(`307`);
  });
});

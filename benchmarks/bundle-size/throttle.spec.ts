import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('throttle bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'throttle');
    expect(bundleSize).toMatchInlineSnapshot(`3111`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'throttle');
    expect(bundleSize).toMatchInlineSnapshot(`763`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'throttle');
    expect(bundleSize).toMatchInlineSnapshot(`1144`);
  });
});

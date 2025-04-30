import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('omit bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'omit');
    expect(bundleSize).toMatchInlineSnapshot(`18549`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'omit');
    expect(bundleSize).toMatchInlineSnapshot(`116`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'omit');
    expect(bundleSize).toMatchInlineSnapshot(`4723`);
  });
});

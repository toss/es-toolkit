import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('clone bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'clone');
    expect(bundleSize).toMatchInlineSnapshot(`14695`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'clone');
    expect(bundleSize).toMatchInlineSnapshot(`866`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'clone');
    expect(bundleSize).toMatchInlineSnapshot(`2527`);
  });
});

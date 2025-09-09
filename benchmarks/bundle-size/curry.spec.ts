import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('curry bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'curry');
    expect(bundleSize).toMatchInlineSnapshot(`11021`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'curry');
    expect(bundleSize).toMatchInlineSnapshot(`197`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'curry');
    expect(bundleSize).toMatchInlineSnapshot(`711`);
  });
});

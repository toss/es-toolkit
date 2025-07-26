import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('zipObject bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'zipObject');
    expect(bundleSize).toMatchInlineSnapshot(`2729`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'zipObject');
    expect(bundleSize).toMatchInlineSnapshot(`101`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'zipObject');
    expect(bundleSize).toMatchInlineSnapshot(`265`);
  });
});

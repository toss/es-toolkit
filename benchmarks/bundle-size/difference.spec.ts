import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('difference bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'difference');
    expect(bundleSize).toMatchInlineSnapshot(`7958`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'difference');
    expect(bundleSize).toMatchInlineSnapshot(`90`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'difference');
    expect(bundleSize).toMatchInlineSnapshot(`433`);
  });
});

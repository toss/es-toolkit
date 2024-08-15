import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('isPlainObject bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'isPlainObject');
    expect(bundleSize).toMatchInlineSnapshot(`1586`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'isPlainObject');
    expect(bundleSize).toMatchInlineSnapshot(`279`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'isPlainObject');
    expect(bundleSize).toMatchInlineSnapshot(`435`);
  });
});

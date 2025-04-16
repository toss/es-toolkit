import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('escapeRegExp bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'escapeRegExp');
    expect(bundleSize).toMatchInlineSnapshot(`1768`);
  });

  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'escapeRegExp');
    expect(bundleSize).toMatchInlineSnapshot(`88`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'escapeRegExp');
    expect(bundleSize).toMatchInlineSnapshot(`260`);
  });
});

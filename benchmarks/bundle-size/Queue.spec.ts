import { describe, expect, it } from 'vitest';
import { getBundleSize, getBundleSizeFromScript } from './utils/getBundleSize';

describe('Queue bundle size', () => {
  it('es-toolkit', async () => {
    const bundleSize = await getBundleSize('es-toolkit', 'Queue');
    expect(bundleSize).toMatchInlineSnapshot(`410`);
  });

  it('yocto-queue', async () => {
    const bundleSize = await getBundleSizeFromScript(`import Queue from "yocto-queue"; console.log(Queue)`);
    expect(bundleSize).toMatchInlineSnapshot(`543`);
  });
});

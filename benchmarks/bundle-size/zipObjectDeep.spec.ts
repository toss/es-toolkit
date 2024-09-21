import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

describe('zipObjectDeep bundle size', () => {
  it('lodash-es', async () => {
    const bundleSize = await getBundleSize('lodash-es', 'zipObjectDeep');
    expect(bundleSize).toMatchInlineSnapshot(`7338`);
  });

  it('es-toolkit/compat', async () => {
    const bundleSize = await getBundleSize('es-toolkit/compat', 'zipObjectDeep');
    expect(bundleSize).toMatchInlineSnapshot(`1022`);
  });
});

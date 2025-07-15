import { describe, expect, expectTypeOf, it } from 'vitest';
import { now } from 'es-toolkit/compat';
import type { now as nowLodash } from 'lodash';

describe('now', () => {
  it('should return the number of milliseconds that have elapsed since the Unix epoch', () => {
    const stamp = Number(new Date());
    const actual = now();

    expect(actual).toBeGreaterThanOrEqual(stamp);

    return new Promise(resolve => setTimeout(resolve, 32)).then(() => {
      expect(now() > actual);
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(now).toEqualTypeOf<typeof nowLodash>();
  });
});

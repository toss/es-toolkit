import { describe, expect, it, expectTypeOf } from 'vitest';
import type { uniqueId as uniqueIdLodash } from 'lodash';
import { uniqueId } from './uniqueId';

describe('uniqueId', () => {
  it('should generate unique ids', () => {
    const actual = Array.from({ length: 1000 }, () => uniqueId());

    expect(new Set(actual).size).toBe(actual.length);
  });

  it('should return a string value when not providing a `prefix`', () => {
    expect(typeof uniqueId()).toBe('string');
  });

  it('should coerce the prefix argument to a string', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const ids = [uniqueId(3), uniqueId(2), uniqueId(1), uniqueId(true)];
    expect(ids[0].startsWith('3')).toBe(true);
    expect(ids[1].startsWith('2')).toBe(true);
    expect(ids[2].startsWith('1')).toBe(true);
    expect(ids[3].startsWith('true')).toBe(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(uniqueId).toEqualTypeOf<typeof uniqueIdLodash>();
  });
});

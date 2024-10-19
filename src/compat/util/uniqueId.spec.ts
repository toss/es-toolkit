import { describe, expect, it } from 'vitest';
import { uniqueId } from './uniqueId';
import * as esToolkit from '../index';

describe('uniqueId', () => {
  it('should generate unique ids', () => {
    const actual = esToolkit.times(1000, () => uniqueId());

    expect(esToolkit.uniq(actual).length).toBe(actual.length);
  });

  it('should return a string value when not providing a `prefix`', () => {
    expect(typeof uniqueId()).toBe('string');
  });

  it('should coerce the prefix argument to a string', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = [uniqueId(3), uniqueId(2), uniqueId(1)];

    expect(/3\d+,2\d+,1\d+/.test(String(actual))).toBe(true);
  });
});

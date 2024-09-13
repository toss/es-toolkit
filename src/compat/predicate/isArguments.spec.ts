import { describe, it, expect } from 'vitest';
import { isArguments } from './isArguments';
import { args } from '../_internal/args';
import { stubFalse } from '../_internal/stubFalse';
import { falsey } from '../_internal/falsey';
import { symbol } from '../_internal/symbol';
import { slice } from '../_internal/slice';
import { strictArgs } from '../_internal/strictArgs';
import { noop } from '../../function';

describe('isArguments', () => {
  it('should return `true` for `arguments` objects', () => {
    expect(isArguments(args)).toBe(true);
    expect(isArguments(strictArgs)).toBe(true);
  });

  it('should return `false` for non `arguments` objects', () => {
    const expected = falsey.map(stubFalse);

    const actual = falsey.map((value, index) => (index ? isArguments(value) : isArguments()));

    expect(actual).toEqual(expected);

    expect(isArguments([1, 2, 3])).toBe(false);
    expect(isArguments(true)).toBe(false);
    expect(isArguments(new Date())).toBe(false);
    expect(isArguments(new Error())).toBe(false);
    expect(isArguments(slice)).toBe(false);
    expect(isArguments({ 0: 1, callee: noop, length: 1 })).toBe(false);
    expect(isArguments(1)).toBe(false);
    expect(isArguments(/x/)).toBe(false);
    expect(isArguments('a')).toBe(false);
    expect(isArguments(symbol)).toBe(false);
  });
});

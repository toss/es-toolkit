import { describe, expect, it } from 'vitest';
import { assignWith } from './assignWith';
import { noop } from '../../function/noop';

describe('assignWith', () => {
  it(`should work with a \`customizer\` callback`, () => {
    const actual = assignWith({ a: 1, b: 2 }, { a: 3, c: 3 }, (a, b) => (a === undefined ? b : a));

    expect(actual).toEqual({ a: 1, b: 2, c: 3 });
  });

  it(`should work with a \`customizer\` that returns \`undefined\``, () => {
    const expected = { a: 1 };
    expect(assignWith({}, expected, noop)).toEqual(expected);
  });

  it('should assign properties from a source object to a target object', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    const result = assignWith(target, source);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should coerce null and undefined targets', () => {
    expect(assignWith(null, { a: 1 }, noop)).toEqual({ a: 1 });
    expect(assignWith(undefined, { a: 1 }, noop)).toEqual({ a: 1 });
  });

  it('should box primitive targets', () => {
    const numberTarget = assignWith(1, { a: 1 }, noop) as any;
    expect(numberTarget).toBeInstanceOf(Number);
    expect(numberTarget.valueOf()).toBe(1);
    expect(numberTarget.a).toBe(1);

    const stringTarget = assignWith('x', { a: 1 }, noop) as any;
    expect(stringTarget).toBeInstanceOf(String);
    expect(stringTarget.valueOf()).toBe('x');
    expect(stringTarget.a).toBe(1);

    const booleanTarget = assignWith(true, { a: 1 }, noop) as any;
    expect(booleanTarget).toBeInstanceOf(Boolean);
    expect(booleanTarget.valueOf()).toBe(true);
    expect(booleanTarget.a).toBe(1);
  });
});

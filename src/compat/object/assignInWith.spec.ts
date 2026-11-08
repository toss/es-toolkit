import { describe, expect, it } from 'vitest';
import { assignInWith } from './assignInWith';
import { noop } from '../../function/noop';

describe('assignInWith', () => {
  it(`should work with a \`customizer\` callback`, () => {
    const actual = assignInWith({ a: 1, b: 2 }, { a: 3, c: 3 }, (a, b) => (a === undefined ? b : a));

    expect(actual).toEqual({ a: 1, b: 2, c: 3 });
  });

  it(`should work with a \`customizer\` that returns \`undefined\``, () => {
    const expected = { a: 1 };
    expect(assignInWith({}, expected, noop)).toEqual(expected);
  });

  it('should assign properties from a source object to a target object', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    const result = assignInWith(target, source);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should coerce null and undefined targets', () => {
    expect(assignInWith(null, { a: 1 }, noop)).toEqual({ a: 1 });
    expect(assignInWith(undefined, { a: 1 }, noop)).toEqual({ a: 1 });
  });

  it('should box primitive targets', () => {
    const numberTarget = assignInWith(1, { a: 1 }, noop) as any;
    expect(numberTarget).toBeInstanceOf(Number);
    expect(numberTarget.valueOf()).toBe(1);
    expect(numberTarget.a).toBe(1);

    const stringTarget = assignInWith('x', { a: 1 }, noop) as any;
    expect(stringTarget).toBeInstanceOf(String);
    expect(stringTarget.valueOf()).toBe('x');
    expect(stringTarget.a).toBe(1);

    const booleanTarget = assignInWith(true, { a: 1 }, noop) as any;
    expect(booleanTarget).toBeInstanceOf(Boolean);
    expect(booleanTarget.valueOf()).toBe(true);
    expect(booleanTarget.a).toBe(1);
  });
});

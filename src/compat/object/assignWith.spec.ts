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

  it('should preserve own __proto__ property and not set as prototype', () => {
    const parsed = JSON.parse('{"__proto__": {"isAdmin": true}, "x": 1}');
    const result = assignWith({}, parsed);

    expect(Object.hasOwn(result as any, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect((result as any).isAdmin).toBeUndefined();
  });
});

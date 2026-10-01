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

  it('should preserve own __proto__ property and not set as prototype', () => {
    const parsed = JSON.parse('{"__proto__": {"isAdmin": true}, "x": 1}');
    const result = assignInWith({}, parsed);

    expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect((result as any).isAdmin).toBeUndefined();
  });
});

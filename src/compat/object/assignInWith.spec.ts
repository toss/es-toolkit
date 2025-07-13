import { describe, expect, expectTypeOf, it } from 'vitest';
import { assignInWith } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import type { assignInWith as assignInWithLodash } from 'lodash';

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

  it('should match the type of lodash', () => {
    expectTypeOf(assignInWith).toEqualTypeOf<typeof assignInWithLodash>();
  });
});

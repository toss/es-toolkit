import { describe, expect, it } from 'vitest';
import { pick } from './pick';

describe('pick', () => {
  it('should pick properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };

    expect(pick(object, ['foo', 'bar'])).toEqual({ foo: 1, bar: 2 });
  });
});

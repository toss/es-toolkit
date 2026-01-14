import { describe, expect, it } from 'vitest';
import { fromPairs } from './fromPairs';

describe('fromPairs', () => {
  it('should convert an array of key-value pairs into an object', () => {
    const result = fromPairs([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle an empty array', () => {
    const result = fromPairs([]);
    expect(result).toEqual({});
  });

  it('should handle number keys', () => {
    const result = fromPairs([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    expect(result).toEqual({ 1: 'one', 2: 'two', 3: 'three' });
  });

  it('should handle symbol keys', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const result = fromPairs([
      [sym1, 'value1'],
      [sym2, 'value2'],
    ] as Array<[symbol, string]>);
    expect(result).toEqual({ [sym1]: 'value1', [sym2]: 'value2' });
  });

  it('should handle mixed value types', () => {
    const result = fromPairs([
      ['string', 'value'],
      ['number', 42],
      ['boolean', true],
      ['null', null],
      ['undefined', undefined],
      ['object', { nested: 'object' }],
      ['array', [1, 2, 3]],
    ] as Array<[string, any]>);
    expect(result).toEqual({
      string: 'value',
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined,
      object: { nested: 'object' },
      array: [1, 2, 3],
    });
  });

  it('should overwrite duplicate keys with the last value', () => {
    const result = fromPairs([
      ['a', 1],
      ['b', 2],
      ['a', 3],
    ]);
    expect(result).toEqual({ a: 3, b: 2 });
  });

  it('should handle readonly arrays', () => {
    const pairs = [
      ['a', 1],
      ['b', 2],
    ] as const;
    const result = fromPairs(pairs);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should work with single pair', () => {
    const result = fromPairs([['key', 'value']]);
    expect(result).toEqual({ key: 'value' });
  });

  it('should preserve type information', () => {
    const pairs: Array<['a' | 'b', number]> = [
      ['a', 1],
      ['b', 2],
    ];
    const result = fromPairs(pairs);

    expect(result).toEqual({ a: 1, b: 2 });
  });
});

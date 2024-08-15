import { describe, expect, it } from 'vitest';
import { noop } from '../../function/noop';
import { identity } from '../_internal/identity';
import { mergeWith } from './mergeWith';
import { last } from '../../array/last';

describe('mergeWith', () => {
  it('should handle merging when `customizer` returns `undefined`', () => {
    let actual: any = mergeWith({ a: { b: [1, 1] } }, { a: { b: [0] } }, noop);
    expect(actual).toEqual({ a: { b: [0, 1] } });

    actual = mergeWith([], [undefined], identity);
    expect(actual).toEqual([undefined]);
  });

  it('should clone sources when `customizer` returns `undefined`', () => {
    const source1 = { a: { b: { c: 1 } } };
    const source2 = { a: { b: { d: 2 } } };

    mergeWith({}, source1, source2, noop);
    expect(source1.a.b).toEqual({ c: 1 });
  });

  it('should defer to `customizer` for non `undefined` results', () => {
    const actual = mergeWith({ a: { b: [0, 1] } }, { a: { b: [2] } }, (a, b) =>
      Array.isArray(a) ? a.concat(b) : undefined
    );

    expect(actual).toEqual({ a: { b: [0, 1, 2] } });
  });

  it('should provide `stack` to `customizer`', () => {
    let actual: any;

    mergeWith({}, { a: { b: 2 } }, function () {
      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line
      actual = last(arguments);
    });

    expect(actual instanceof Map).toBe(true);
  });

  it('should overwrite primitives with source object clones', () => {
    const actual = mergeWith({ a: 0 }, { a: { b: ['c'] } }, (a, b) => (Array.isArray(a) ? a.concat(b) : undefined));

    expect(actual).toEqual({ a: { b: ['c'] } });
  });

  it('should pop the stack of sources for each sibling property', () => {
    const array = ['b', 'c'];
    const object = { a: ['a'] };
    const source = { a: array, b: array };

    const actual = mergeWith(object, source, (a, b) => (Array.isArray(a) ? a.concat(b) : undefined));

    expect(actual).toEqual({ a: ['a', 'b', 'c'], b: ['b', 'c'] });
  });
});

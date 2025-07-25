import { describe, expect, it } from 'vitest';
import { merge, mergeWith, toMerged } from 'es-toolkit';
import { get, merge as mergeCompat, mergeWith as mergeWithCompat, set, unset, zipObjectDeep } from '../src/compat';

describe('__proto__', () => {
  it('should not be polluted in merge', () => {
    merge({}, { ['__proto__']: { polluted: 'yes' } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in toMerged', () => {
    toMerged({}, { ['__proto__']: { polluted: 'yes' } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in mergeWith', () => {
    mergeWith({}, { ['__proto__']: { polluted: 'yes' } }, (x, y) => {
      if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in compat/merge', () => {
    mergeCompat({}, { ['__proto__']: { polluted: 'yes' } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in compat/mergeWith', () => {
    mergeWithCompat({}, { ['__proto__']: { polluted: 'yes' } }, (x, y) => {
      if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in compat/set', () => {
    set({}, '__proto__.polluted', 'yes');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in compat/zipObjectDeep', () => {
    zipObjectDeep(['__proto__.polluted'], ['yes']);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it('should not be polluted in compat/unset', () => {
    unset({}, '__proto__.toString');

    expect({}.toString).not.toBeUndefined();

    const object = { a: 1 };
    expect(unset(object, '__proto__')).toBe(false);
    expect(unset(object, { toString: () => '__proto__' } as any)).toBe(false);
    expect(unset(object, ['a', '__proto__'])).toBe(false);
  });

  it('should not be polluted in compat/get', () => {
    const object = { a: 1 };
    expect(get(object, '__proto__')).toBeUndefined();
    expect(get(object, { toString: () => '__proto__' } as any)).toBeUndefined();
    expect(get(object, ['a', '__proto__'])).toBeUndefined();
  });
});

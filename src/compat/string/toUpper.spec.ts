import { describe, expect, expectTypeOf, it } from 'vitest';
import type { toUpper as toUpperLodash } from 'lodash';
import { toUpper } from './toUpper';

describe('toUpper', () => {
  const strings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  it('should convert string to upper case while preserving special characters', () => {
    const actual = strings.map(string => toUpper(string));
    const expected = ['FOO BAR', 'FOO BAR', 'FOO BAR', 'FOO BAR', 'FOO BAR', 'FOOBAR', '--FOO-BAR--', '__FOO_BAR__'];
    expect(actual).toEqual(expected);
  });

  it('should handle double-converting strings', () => {
    const actual = strings.map(string => toUpper(toUpper(string)));
    const expected = strings.map(string => toUpper(string));
    expect(actual).toEqual(expected);
  });

  it('should preserve contractions with apostrophes', () => {
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];
    ["'", '\u2019'].forEach(apos => {
      const actual = postfixes.map(postfix => toUpper(`a b${apos}${postfix} c`));
      const expected = postfixes.map(postfix => `A B${apos}${postfix.toUpperCase()} C`);
      expect(actual).toEqual(expected);
    });
  });

  it('should preserve spaces and special characters', () => {
    expect(toUpper('hello   world')).toBe('HELLO   WORLD');
    expect(toUpper('!@#$hello%^&*')).toBe('!@#$HELLO%^&*');
    expect(toUpper('tabs\tand\nnewlines')).toBe('TABS\tAND\nNEWLINES');
  });

  it('should handle unicode characters', () => {
    expect(toUpper('café')).toBe('CAFÉ');
    expect(toUpper('über')).toBe('ÜBER');
    expect(toUpper('señor')).toBe('SEÑOR');
  });

  it('should preserve Latin mathematical operators', () => {
    expect(toUpper('\xd7')).toBe('\xd7');
    expect(toUpper('\xf7')).toBe('\xf7');
  });

  it('should handle null and undefined', () => {
    expect((toUpper as any)(null)).toBe('');
    expect((toUpper as any)(undefined)).toBe('');
  });

  it('should handle numbers including special cases', () => {
    expect((toUpper as any)(123)).toBe('123');
    expect((toUpper as any)(-0)).toBe('-0');
    expect((toUpper as any)(0)).toBe('0');
    expect((toUpper as any)(Infinity)).toBe('INFINITY');
    expect((toUpper as any)(NaN)).toBe('NAN');
  });

  it('should handle arrays', () => {
    expect((toUpper as any)([1, 2, 3])).toBe('1,2,3');
    expect((toUpper as any)(['a', 'b', 'c'])).toBe('A,B,C');
    expect((toUpper as any)([1, 'b', -0])).toBe('1,B,-0');
    expect((toUpper as any)([])).toBe('');
  });

  it('should handle nested arrays', () => {
    expect((toUpper as any)([1, [2, 3], 4])).toBe('1,2,3,4');
    expect((toUpper as any)([[['a']]])).toBe('A');
  });

  it('should handle symbols', () => {
    const sym1 = Symbol('test');
    const sym2 = Symbol('');
    expect((toUpper as any)(sym1)).toBe('SYMBOL(TEST)');
    expect((toUpper as any)(sym2)).toBe('SYMBOL()');
    expect((toUpper as any)([Symbol('a'), Symbol('b')])).toBe('SYMBOL(A),SYMBOL(B)');
  });

  it('should handle objects', () => {
    const obj = { toString: () => 'custom' };
    expect((toUpper as any)(obj)).toBe('CUSTOM');
    expect((toUpper as any)({})).toBe('[OBJECT OBJECT]');
  });

  it('should handle mixed types in arrays', () => {
    const sym = Symbol('test');
    expect((toUpper as any)([1, 'b', sym, null, undefined])).toBe('1,B,SYMBOL(TEST),,');
  });

  it('should maintain proper TypeScript types', () => {
    const result1: string = (toUpper as any)('test');
    const result2: string = (toUpper as any)(123);
    const result3: string = (toUpper as any)(null);
    const result4: string = (toUpper as any)(undefined);

    expect(typeof result1).toBe('string');
    expect(typeof result2).toBe('string');
    expect(typeof result3).toBe('string');
    expect(typeof result4).toBe('string');
  });

  it('should handle empty strings', () => {
    expect(toUpper('')).toBe('');
  });

  it('should handle whitespace strings', () => {
    expect(toUpper(' ')).toBe(' ');
    expect(toUpper('\t')).toBe('\t');
    expect(toUpper('\n')).toBe('\n');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(toUpper).toEqualTypeOf<typeof toUpperLodash>();
  });
});

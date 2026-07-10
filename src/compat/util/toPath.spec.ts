import { describe, expect, it } from 'vitest';
import { toPath } from './toPath';

describe('toPath function', () => {
  it('converts dot-separated keys correctly', () => {
    const result = toPath('a.b.c');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('converts bracket notation keys correctly', () => {
    const result = toPath('a[b][c]');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('handles mixed notation correctly', () => {
    const result = toPath('a[b].c');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('handles leading dots correctly', () => {
    const result = toPath('.a.b.c');
    expect(result).toEqual(['', 'a', 'b', 'c']);
  });

  it('handles quoted keys correctly', () => {
    const result = toPath('a["b.c"].d');
    expect(result).toEqual(['a', 'b.c', 'd']);
  });

  it('handles empty input correctly', () => {
    const result = toPath('');
    expect(result).toEqual([]);
  });

  it('handles complex paths correctly', () => {
    const result = toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
    expect(result).toEqual(['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
  });

  it('handles complex input with leading dot correctly', () => {
    const result = toPath('.a[b].c.d[e]["f.g"].h');
    expect(result).toEqual(['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']);
  });

  it('handles empty brackets correctly', () => {
    const result = toPath('a[].b');
    expect(result).toEqual(['a', '', 'b']);
  });

  it('keeps empty segments for consecutive dots', () => {
    expect(toPath('a..b')).toEqual(['a', '', 'b']);
    expect(toPath('a...b')).toEqual(['a', '', '', 'b']);
    expect(toPath('..a')).toEqual(['', '', 'a']);
    expect(toPath('a.b..c.d')).toEqual(['a', 'b', '', 'c', 'd']);
  });

  it('keeps a trailing empty segment for a trailing dot', () => {
    expect(toPath('a.')).toEqual(['a', '']);
    expect(toPath('a.b.')).toEqual(['a', 'b', '']);
  });

  it('handles array input correctly', () => {
    const sym = Symbol('sym');
    const result = toPath(['a', 'b', 'c', -0, sym]);
    expect(result).toEqual(['a', 'b', 'c', '-0', sym]);
  });

  it('handles symbol input correctly', () => {
    const sym = Symbol('mySymbol');
    const result = toPath(sym);
    expect(result).toEqual([sym]);
  });

  it('handles non-string/non-array input by converting to string', () => {
    expect(toPath(123)).toEqual(['123']);
    expect(toPath(true)).toEqual(['true']);
    expect(toPath(-0)).toEqual(['-0']);
    expect(toPath(new Set())).toEqual(['object Set']);
    expect(toPath(null)).toEqual([]);
    expect(toPath(undefined)).toEqual([]);
  });
});

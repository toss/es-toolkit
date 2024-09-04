import { describe, it, expect } from 'vitest';
import { escape } from './escape';
import { unescape } from './unescape';

describe('escape', () => {
  let escaped = '&amp;&lt;&gt;&quot;&#39;/';
  let unescaped = '&<>"\'/';

  escaped += escaped;
  unescaped += unescaped;

  it('should escape values', () => {
    expect(escape(unescaped)).toBe(escaped);
  });

  it('should handle strings with nothing to escape', () => {
    expect(escape('abc')).toBe('abc');
  });

  it('should escape the same characters unescaped by `_.unescape`', () => {
    expect(escape(unescape(escaped))).toBe(escaped);
  });

  ['`', '/'].forEach(chr => {
    it(`should not escape the "${chr}" character`, () => {
      expect(escape(chr)).toBe(chr);
    });
  });
});

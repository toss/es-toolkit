import { describe, it, expect } from 'vitest';
import { escapeRegExp } from './escapeRegExp';

describe('escapeRegExp', () => {
  const escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\';
  const unescaped = '^$.*+?()[]{}|\\';

  it('should escape values', () => {
    expect(escapeRegExp(unescaped + unescaped)).toBe(escaped + escaped);
  });

  it('should handle strings with nothing to escape', () => {
    expect(escapeRegExp('abc')).toBe('abc');
  });
});

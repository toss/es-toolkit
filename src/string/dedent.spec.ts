import { describe, expect, it } from 'vitest';
import { dedent } from './dedent';

describe('dedent', () => {
  it('should remove common leading whitespace from each line', () => {
    expect(dedent('  hello\n  world')).toBe('hello\nworld');
  });

  it('should preserve relative indentation', () => {
    expect(dedent('  hello\n    world')).toBe('hello\n  world');
  });

  it('should handle a tagged template literal', () => {
    const result = dedent`
      hello
      world
    `;
    expect(result).toBe('hello\nworld');
  });

  it('should preserve relative indentation in a tagged template literal', () => {
    const result = dedent`
      hello
        world
    `;
    expect(result).toBe('hello\n  world');
  });

  it('should handle interpolations in a tagged template literal', () => {
    const name = 'world';
    const result = dedent`
      hello
      ${name}
    `;
    expect(result).toBe('hello\nworld');
  });

  it('should handle empty lines', () => {
    const result = dedent`
      hello

      world
    `;
    expect(result).toBe('hello\n\nworld');
  });

  it('should handle a single line', () => {
    expect(dedent('  hello')).toBe('hello');
  });

  it('should handle an empty string', () => {
    expect(dedent('')).toBe('');
  });

  it('should handle a string with no indentation', () => {
    expect(dedent('hello\nworld')).toBe('hello\nworld');
  });

  it('should handle tab indentation', () => {
    expect(dedent('\t\thello\n\t\tworld')).toBe('hello\nworld');
  });

  it('should remove first and last empty lines', () => {
    expect(dedent('\n  hello\n  world\n')).toBe('hello\nworld');
  });

  it('should handle lines with only whitespace', () => {
    expect(dedent('  hello\n    \n  world')).toBe('hello\n\nworld');
  });

  it('should handle mixed indentation levels', () => {
    expect(dedent('    a\n  b\n      c')).toBe('  a\nb\n    c');
  });

  it('should handle Windows line endings', () => {
    expect(dedent('  hello\r\n  world')).toBe('hello\nworld');
  });

  it('should handle a string with only empty lines', () => {
    expect(dedent('\n\n\n')).toBe('');
  });

  it('should compose with another tag function', () => {
    const upper = (strings: TemplateStringsArray, ...values: unknown[]) => {
      let result = '';
      for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
          result += String(values[i]);
        }
      }
      return result.toUpperCase();
    };

    const dedentedUpper = dedent(upper);
    const result = dedentedUpper`
      hello
      world
    `;
    expect(result).toBe('HELLO\nWORLD');
  });

  it('should compose with another tag function and preserve interpolations', () => {
    const identity = (strings: TemplateStringsArray, ...values: unknown[]) => {
      let result = '';
      for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
          result += String(values[i]);
        }
      }
      return result;
    };

    const dedentedIdentity = dedent(identity);
    const name = 'es-toolkit';
    const result = dedentedIdentity`
      Welcome to
      ${name}!
    `;
    expect(result).toBe('Welcome to\nes-toolkit!');
  });
});

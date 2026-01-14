import { describe, expect, it } from 'vitest';
import { dedent } from './dedent';

describe('dedent', () => {
  it('removes indentation from a multi-line string', () => {
    const result = dedent`
      line 1
        line 2
      line 3
    `;
    expect(result).toBe('line 1\n  line 2\nline 3');
  });

  it('works as a function', () => {
    const result = dedent(`
      line 1
      line 2
    `);
    expect(result).toBe('line 1\nline 2');
  });

  it('handles interpolation', () => {
    const value = 'world';
    const result = dedent`
      hello
      ${value}
    `;
    expect(result).toBe('hello\nworld');
  });

  it('removes common indentation with blank lines', () => {
    const result = dedent`
      line 1

        line 2
    `;
    expect(result).toBe('line 1\n\n  line 2');
  });

  it('removes leading and trailing empty lines', () => {
    const result = dedent`
      text
    `;
    expect(result).toBe('text');
  });

  it('handles mixed indentation correctly (closest common indent)', () => {
    const result = dedent`
      <div>
        <span>
      </div>
    `;
    expect(result).toBe('<div>\n  <span>\n</div>');
  });

  it('does not strip indentation if there is none common', () => {
    const result = dedent`
    line 1
  line 2
      `;
    expect(result).toBe('  line 1\nline 2');
  });

  it('handles lines that do not start with common indent', () => {
    const result = dedent`
      indented
no-indent
    `;
    expect(result).toBe('      indented\nno-indent');
  });

  it('handles string without leading newline', () => {
    const result = dedent('  hello\n  world');
    expect(result).toBe('hello\nworld');
  });

  it('handles string without trailing newline', () => {
    const result = dedent('  hello\n  world');
    expect(result).toBe('hello\nworld');
  });

  it('handles empty string', () => {
    const result = dedent('');
    expect(result).toBe('');
  });

  it('handles string with only whitespace', () => {
    const result = dedent('   \n   \n   ');
    expect(result).toBe('   ');
  });

  it('handles single line without indentation', () => {
    const result = dedent('hello');
    expect(result).toBe('hello');
  });

  it('handles lines with content but no leading whitespace', () => {
    const result = dedent('line1\nline2\nline3');
    expect(result).toBe('line1\nline2\nline3');
  });

  it('preserves non-indented content line when common indent exists', () => {
    const result = dedent('    indented\na');
    expect(result).toBe('    indented\na');
  });
});

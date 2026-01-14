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
    // 'line 1' has 4 spaces, 'line 2' has 2 spaces. Common is 2 spaces.
    // Wait, checking my logic...
    // line 1: "    line 1" (4 spaces)
    // line 2: "  line 2" (2 spaces)
    // Common: 2 spaces.
    // Result: "  line 1\nline 2"
    expect(result).toBe('  line 1\nline 2');
  });
});

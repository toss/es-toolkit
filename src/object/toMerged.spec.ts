import { describe, expect, it } from 'vitest';
import { toMerged } from './toMerged';

describe('toMerged', () => {
  it('should merge properties from source object into target object', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };

    const result = toMerged(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('should deeply merge nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });
    expect(target).toEqual({ a: { x: 1, y: 2 }, b: 2 });

    const names = {
      characters: [{ name: 'barney' }, { name: 'fred' }],
    };

    const ages = {
      characters: [{ age: 36 }, { age: 40 }],
    };

    const heights = {
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
    };

    const expected = {
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' },
      ],
    };

    expect(toMerged(toMerged(names, ages), heights)).toEqual(expected);
    expect(names).toEqual({
      characters: [{ name: 'barney' }, { name: 'fred' }],
    });

    const target2 = { a: [1, 2], b: { x: 1 } };
    const source2 = { a: [3], b: { y: 2 } };
    expect(toMerged(target2, source2)).toEqual({ a: [3, 2], b: { x: 1, y: 2 } });
    expect(target2).toEqual({ a: [1, 2], b: { x: 1 } });
  });

  it('should deeply merge nested objects if they are shared', () => {
    const lightTypography = {
      secondaryBold: {
        fontSize: '16px',
      },
      tertiaryBold: {
        fontSize: '14px',
      },
    };

    const lightComponents = {
      button: {
        sm: {
          generic: {
            textLabel: lightTypography.tertiaryBold,
          },
        },
      },
      calendarPicker: {
        inputPlaceholder: lightTypography.secondaryBold,
      },
    };

    const darkTypography = {
      tertiaryBold: {
        fontSize: '14px',
      },
    };

    const darkComponents = {
      button: {
        sm: {
          generic: {
            textLabel: darkTypography.tertiaryBold,
          },
        },
      },
      calendarPicker: {
        inputPlaceholder: darkTypography.tertiaryBold,
      },
    };

    expect(toMerged(darkComponents, lightComponents)).toEqual({
      button: {
        sm: {
          generic: {
            textLabel: {
              fontSize: '14px',
            },
          },
        },
      },
      calendarPicker: {
        inputPlaceholder: {
          fontSize: '16px',
        },
      },
    });

    expect(darkComponents).toMatchInlineSnapshot(`
      {
        "button": {
          "sm": {
            "generic": {
              "textLabel": {
                "fontSize": "14px",
              },
            },
          },
        },
        "calendarPicker": {
          "inputPlaceholder": {
            "fontSize": "14px",
          },
        },
      }
    `);
  });

  it('should merge arrays deeply', () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4] };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: [3, 4] });
    expect(target).toEqual({ a: [1, 2] });
  });

  it('should handle merging with null values', () => {
    const target = { a: null };
    const source = { a: [1, 2, 3] };

    const result = toMerged(target, source);

    expect(result).toEqual({ a: [1, 2, 3] });
    expect(target).toEqual({ a: null });
  });

  it('should not overwrite existing values with undefined from source', () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined, c: 3 };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('should handle merging of deeply nested objects with arrays and objects', () => {
    const target = { a: { b: { c: [1] } } };
    const source = { a: { b: { c: [2], d: 3 }, e: [4] } };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { b: { c: [2], d: 3 }, e: [4] } });
    expect(target).toEqual({ a: { b: { c: [1] } } });
  });

  it('should replace non-plain-object target value with plain object from source', () => {
    const target = { a: 'string', b: 123, c: true };
    const source = { a: { x: 1 }, b: { y: 2 }, c: { z: 3 } };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { x: 1 }, b: { y: 2 }, c: { z: 3 } });
    expect(target).toEqual({ a: 'string', b: 123, c: true });
  });

  it('should handle nested case where non-plain-object is replaced with plain object', () => {
    const target = { a: { b: null, c: undefined, d: 'text' } };
    const source = { a: { b: { x: 1 }, c: { y: 2 }, d: { z: 3 } } };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { b: { x: 1 }, c: { y: 2 }, d: { z: 3 } } });
    expect(target).toEqual({ a: { b: null, c: undefined, d: 'text' } });
  });
});

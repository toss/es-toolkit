import { describe, expect, expectTypeOf, it } from 'vitest';
import { toKebabCaseKeys } from './toKebabCaseKeys';

describe('kebabizeKeys', () => {
  it('should convert camelCase keys to kebab-case in a flat object', () => {
    const input = { userId: 1, firstName: 'John', lastName: 'Doe' };
    const expected = { 'user-id': 1, 'first-name': 'John', 'last-name': 'Doe' };
    expect(toKebabCaseKeys(input)).toEqual(expected);
  });

  it('should convert keys recursively in nested objects', () => {
    const input = {
      userData: {
        userId: 1,
        userAddress: {
          streetName: 'Main St',
          zipCode: '12345',
        },
      },
    };
    const expected = {
      'user-data': {
        'user-id': 1,
        'user-address': {
          'street-name': 'Main St',
          'zip-code': '12345',
        },
      },
    };
    expect(toKebabCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { userId: 1, firstName: 'John' },
      { userId: 2, firstName: 'Jane' },
    ];
    const expected = [
      { 'user-id': 1, 'first-name': 'John' },
      { 'user-id': 2, 'first-name': 'Jane' },
    ];
    expect(toKebabCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays inside objects', () => {
    const input = {
      userList: [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ],
    };
    const expected = {
      'user-list': [
        { 'user-id': 1, 'first-name': 'John' },
        { 'user-id': 2, 'first-name': 'Jane' },
      ],
    };
    expect(toKebabCaseKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(toKebabCaseKeys(123)).toBe(123);
    expect(toKebabCaseKeys('string')).toBe('string');
    expect(toKebabCaseKeys(null)).toBe(null);
    expect(toKebabCaseKeys(undefined)).toBe(undefined);
    expect(toKebabCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(toKebabCaseKeys({})).toEqual({});
    expect(toKebabCaseKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { userId: 1, toString: Object.prototype.toString };
    const result = toKebabCaseKeys(input);
    expect(result).toHaveProperty('user-id', 1);
    expect(result).toHaveProperty('toString');
    expect(result.toString).toBe(Object.prototype.toString);
  });

  it('should properly type nested objects', () => {
    const input = {
      userData: {
        personalInfo: {
          firstName: 'John',
        },
      },
    };
    const result = toKebabCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      'user-data': {
        'personal-info': {
          'first-name': string;
        };
      };
    }>();
  });

  it('should properly type arrays', () => {
    const input = [{ userId: 1 }, { userId: 2 }];
    const result = toKebabCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<Array<{ 'user-id': number }>>();
  });

  it('should properly type mixed complex structures', () => {
    const input = {
      users: [
        { userId: 1, settings: { isActive: true } },
        { userId: 2, settings: { isActive: false } },
      ],
    };
    const result = toKebabCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      users: Array<{
        'user-id': number;
        settings: {
          'is-active': boolean;
        };
      }>;
    }>();
  });

  it('should have correct TypeScript types for non-plain objects', () => {
    const input = { a: new Date(), b: /test/, c: new Map() };
    const result = toKebabCaseKeys(input);

    expectTypeOf(result.a).toEqualTypeOf<Date>();
    expectTypeOf(result.b).toEqualTypeOf<RegExp>();
    expectTypeOf(result.c).toEqualTypeOf<Map<any, any>>();
  });

  it('should convert uppercase keys to kebab-case at both runtime and type level', () => {
    const input = {
      FIRST_NAME: 'JinHo',
      LAST: 'Yeom',
    } as const;

    const result = toKebabCaseKeys(input);

    expect(result).toEqual({
      'first-name': 'JinHo',
      last: 'Yeom',
    });

    expectTypeOf(result).toMatchTypeOf<{
      'first-name': 'JinHo';
      last: 'Yeom';
    }>();
  });
});

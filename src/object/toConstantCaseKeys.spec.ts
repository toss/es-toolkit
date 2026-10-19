import { describe, expect, expectTypeOf, it } from 'vitest';
import { toConstantCaseKeys } from './toConstantCaseKeys';

describe('constantizeKeys', () => {
  it('should convert camelCase keys to CONSTANT_CASE in a flat object', () => {
    const input = { userId: 1, firstName: 'John', lastName: 'Doe' };
    const expected = { USER_ID: 1, FIRST_NAME: 'John', LAST_NAME: 'Doe' };
    expect(toConstantCaseKeys(input)).toEqual(expected);
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
      USER_DATA: {
        USER_ID: 1,
        USER_ADDRESS: {
          STREET_NAME: 'Main St',
          ZIP_CODE: '12345',
        },
      },
    };
    expect(toConstantCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { userId: 1, firstName: 'John' },
      { userId: 2, firstName: 'Jane' },
    ];
    const expected = [
      { USER_ID: 1, FIRST_NAME: 'John' },
      { USER_ID: 2, FIRST_NAME: 'Jane' },
    ];
    expect(toConstantCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays inside objects', () => {
    const input = {
      userList: [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ],
    };
    const expected = {
      USER_LIST: [
        { USER_ID: 1, FIRST_NAME: 'John' },
        { USER_ID: 2, FIRST_NAME: 'Jane' },
      ],
    };
    expect(toConstantCaseKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(toConstantCaseKeys(123)).toBe(123);
    expect(toConstantCaseKeys('string')).toBe('string');
    expect(toConstantCaseKeys(null)).toBe(null);
    expect(toConstantCaseKeys(undefined)).toBe(undefined);
    expect(toConstantCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(toConstantCaseKeys({})).toEqual({});
    expect(toConstantCaseKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { userId: 1, toString: Object.prototype.toString };
    const result = toConstantCaseKeys(input);
    expect(result).toHaveProperty('USER_ID', 1);
    expect(result).toHaveProperty('TO_STRING');
    expect(result.TO_STRING).toBe(Object.prototype.toString);
  });

  it('should properly type nested objects', () => {
    const input = {
      userData: {
        personalInfo: {
          firstName: 'John',
        },
      },
    };
    const result = toConstantCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      USER_DATA: {
        PERSONAL_INFO: {
          FIRST_NAME: string;
        };
      };
    }>();
  });

  it('should properly type arrays', () => {
    const input = [{ userId: 1 }, { userId: 2 }];
    const result = toConstantCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<Array<{ USER_ID: number }>>();
  });

  it('should properly type mixed complex structures', () => {
    const input = {
      users: [
        { userId: 1, settings: { isActive: true } },
        { userId: 2, settings: { isActive: false } },
      ],
    };
    const result = toConstantCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      USERS: Array<{
        USER_ID: number;
        SETTINGS: {
          IS_ACTIVE: boolean;
        };
      }>;
    }>();
  });

  it('should have correct TypeScript types for non-plain objects', () => {
    const input = { a: new Date(), b: /test/, c: new Map() };
    const result = toConstantCaseKeys(input);

    expectTypeOf(result.A).toEqualTypeOf<Date>();
    expectTypeOf(result.B).toEqualTypeOf<RegExp>();
    expectTypeOf(result.C).toEqualTypeOf<Map<any, any>>();
  });

  it('should convert snake_case keys to CONSTANT_CASE at both runtime and type level', () => {
    const input = {
      first_name: 'JinHo',
      last: 'Yeom',
    } as const;

    const result = toConstantCaseKeys(input);

    expect(result).toEqual({
      FIRST_NAME: 'JinHo',
      LAST: 'Yeom',
    });

    expectTypeOf(result).toMatchTypeOf<{
      FIRST_NAME: 'JinHo';
      LAST: 'Yeom';
    }>();
  });
});

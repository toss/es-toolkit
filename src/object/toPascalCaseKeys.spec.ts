import { describe, expect, expectTypeOf, it } from 'vitest';
import { toPascalCaseKeys } from './toPascalCaseKeys';

describe('pascalizeKeys', () => {
  it('should convert camelCase keys to PascalCase in a flat object', () => {
    const input = { userId: 1, firstName: 'John', lastName: 'Doe' };
    const expected = { UserId: 1, FirstName: 'John', LastName: 'Doe' };
    expect(toPascalCaseKeys(input)).toEqual(expected);
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
      UserData: {
        UserId: 1,
        UserAddress: {
          StreetName: 'Main St',
          ZipCode: '12345',
        },
      },
    };
    expect(toPascalCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { userId: 1, firstName: 'John' },
      { userId: 2, firstName: 'Jane' },
    ];
    const expected = [
      { UserId: 1, FirstName: 'John' },
      { UserId: 2, FirstName: 'Jane' },
    ];
    expect(toPascalCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays inside objects', () => {
    const input = {
      userList: [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ],
    };
    const expected = {
      UserList: [
        { UserId: 1, FirstName: 'John' },
        { UserId: 2, FirstName: 'Jane' },
      ],
    };
    expect(toPascalCaseKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(toPascalCaseKeys(123)).toBe(123);
    expect(toPascalCaseKeys('string')).toBe('string');
    expect(toPascalCaseKeys(null)).toBe(null);
    expect(toPascalCaseKeys(undefined)).toBe(undefined);
    expect(toPascalCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(toPascalCaseKeys({})).toEqual({});
    expect(toPascalCaseKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { userId: 1, toString: Object.prototype.toString };
    const result = toPascalCaseKeys(input);
    expect(result).toHaveProperty('UserId', 1);
    expect(result).toHaveProperty('ToString');
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
    const result = toPascalCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      UserData: {
        PersonalInfo: {
          FirstName: string;
        };
      };
    }>();
  });

  it('should properly type arrays', () => {
    const input = [{ userId: 1 }, { userId: 2 }];
    const result = toPascalCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<Array<{ UserId: number }>>();
  });

  it('should properly type mixed complex structures', () => {
    const input = {
      users: [
        { userId: 1, settings: { isActive: true } },
        { userId: 2, settings: { isActive: false } },
      ],
    };
    const result = toPascalCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      Users: Array<{
        UserId: number;
        Settings: {
          IsActive: boolean;
        };
      }>;
    }>();
  });

  it('should have correct TypeScript types for non-plain objects', () => {
    const input = { a: new Date(), b: /test/, c: new Map() };
    const result = toPascalCaseKeys(input);

    expectTypeOf(result.A).toEqualTypeOf<Date>();
    expectTypeOf(result.B).toEqualTypeOf<RegExp>();
    expectTypeOf(result.C).toEqualTypeOf<Map<any, any>>();
  });

  it('should convert uppercase keys to PascalCase at both runtime and type level', () => {
    const input = {
      FIRST_NAME: 'JinHo',
      LAST: 'Yeom',
    } as const;

    const result = toPascalCaseKeys(input);

    expect(result).toEqual({
      FirstName: 'JinHo',
      Last: 'Yeom',
    });

    expectTypeOf(result).toMatchTypeOf<{
      FirstName: 'JinHo';
      Last: 'Yeom';
    }>();
  });
});

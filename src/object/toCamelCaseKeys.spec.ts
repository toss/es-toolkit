import { describe, expect, expectTypeOf, it } from 'vitest';
import { toCamelCaseKeys } from './toCamelCaseKeys';

describe('camelizeKeys', () => {
  it('should convert snake_case keys to camelCase in a flat object', () => {
    const input = { user_id: 1, first_name: 'John', last_name: 'Doe' };
    const expected = { userId: 1, firstName: 'John', lastName: 'Doe' };
    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should convert keys recursively in nested objects', () => {
    const input = {
      user_data: {
        user_id: 1,
        user_address: {
          street_name: 'Main St',
          zip_code: '12345',
        },
      },
    };
    const expected = {
      userData: {
        userId: 1,
        userAddress: {
          streetName: 'Main St',
          zipCode: '12345',
        },
      },
    };
    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { user_id: 1, first_name: 'John' },
      { user_id: 2, first_name: 'Jane' },
    ];
    const expected = [
      { userId: 1, firstName: 'John' },
      { userId: 2, firstName: 'Jane' },
    ];
    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays inside objects', () => {
    const input = {
      user_list: [
        { user_id: 1, first_name: 'John' },
        { user_id: 2, first_name: 'Jane' },
      ],
    };
    const expected = {
      userList: [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ],
    };
    expect(toCamelCaseKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(toCamelCaseKeys(123)).toBe(123);
    expect(toCamelCaseKeys('string')).toBe('string');
    expect(toCamelCaseKeys(null)).toBe(null);
    expect(toCamelCaseKeys(undefined)).toBe(undefined);
    expect(toCamelCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(toCamelCaseKeys({})).toEqual({});
    expect(toCamelCaseKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { user_id: 1, toString: Object.prototype.toString };
    const result = toCamelCaseKeys(input);
    expect(result).toHaveProperty('userId', 1);
    expect(result).toHaveProperty('toString');
    expect(result.toString).toBe(Object.prototype.toString);
  });

  it('should properly type nested objects', () => {
    const input = {
      user_data: {
        personal_info: {
          first_name: 'John',
        },
      },
    };
    const result = toCamelCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      userData: {
        personalInfo: {
          firstName: string;
        };
      };
    }>();
  });

  it('should properly type arrays', () => {
    const input = [{ user_id: 1 }, { user_id: 2 }];
    const result = toCamelCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<Array<{ userId: number }>>();
  });

  it('should properly type mixed complex structures', () => {
    const input = {
      users: [
        { user_id: 1, settings: { is_active: true } },
        { user_id: 2, settings: { is_active: false } },
      ],
    };
    const result = toCamelCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      users: Array<{
        userId: number;
        settings: {
          isActive: boolean;
        };
      }>;
    }>();
  });
});

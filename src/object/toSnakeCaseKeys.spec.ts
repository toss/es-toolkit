import { describe, expect, expectTypeOf, it } from 'vitest';
import { toSnakeCaseKeys } from './toSnakeCaseKeys';

describe('snakeizeKeys', () => {
  it('should convert camelCase keys to snake_case in a flat object', () => {
    const input = { userId: 1, firstName: 'John', lastName: 'Doe' };
    const expected = { user_id: 1, first_name: 'John', last_name: 'Doe' };
    expect(toSnakeCaseKeys(input)).toEqual(expected);
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
      user_data: {
        user_id: 1,
        user_address: {
          street_name: 'Main St',
          zip_code: '12345',
        },
      },
    };
    expect(toSnakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { userId: 1, firstName: 'John' },
      { userId: 2, firstName: 'Jane' },
    ];
    const expected = [
      { user_id: 1, first_name: 'John' },
      { user_id: 2, first_name: 'Jane' },
    ];
    expect(toSnakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays inside objects', () => {
    const input = {
      userList: [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ],
    };
    const expected = {
      user_list: [
        { user_id: 1, first_name: 'John' },
        { user_id: 2, first_name: 'Jane' },
      ],
    };
    expect(toSnakeCaseKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(toSnakeCaseKeys(123)).toBe(123);
    expect(toSnakeCaseKeys('string')).toBe('string');
    expect(toSnakeCaseKeys(null)).toBe(null);
    expect(toSnakeCaseKeys(undefined)).toBe(undefined);
    expect(toSnakeCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(toSnakeCaseKeys({})).toEqual({});
    expect(toSnakeCaseKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { userId: 1, toString: Object.prototype.toString };
    const result = toSnakeCaseKeys(input);
    expect(result).toHaveProperty('user_id', 1);
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
    const result = toSnakeCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      user_data: {
        personal_info: {
          first_name: string;
        };
      };
    }>();
  });

  it('should properly type arrays', () => {
    const input = [{ userId: 1 }, { userId: 2 }];
    const result = toSnakeCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<Array<{ user_id: number }>>();
  });

  it('should properly type mixed complex structures', () => {
    const input = {
      users: [
        { userId: 1, settings: { isActive: true } },
        { userId: 2, settings: { isActive: false } },
      ],
    };
    const result = toSnakeCaseKeys(input);

    expectTypeOf(result).toMatchTypeOf<{
      users: Array<{
        user_id: number;
        settings: {
          is_active: boolean;
        };
      }>;
    }>();
  });
});

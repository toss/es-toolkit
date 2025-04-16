import { describe, expect, it } from 'vitest';
import { camelizeKeys } from './camelizeKeys';

describe('camelizeKeys', () => {
  it('should convert snake_case keys to camelCase in a flat object', () => {
    const input = { user_id: 1, first_name: 'John', last_name: 'Doe' };
    const expected = { userId: 1, firstName: 'John', lastName: 'Doe' };
    expect(camelizeKeys(input)).toEqual(expected);
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
    expect(camelizeKeys(input)).toEqual(expected);
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
    expect(camelizeKeys(input)).toEqual(expected);
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
    expect(camelizeKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(camelizeKeys(123)).toBe(123);
    expect(camelizeKeys('string')).toBe('string');
    expect(camelizeKeys(null)).toBe(null);
    expect(camelizeKeys(undefined)).toBe(undefined);
    expect(camelizeKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(camelizeKeys({})).toEqual({});
    expect(camelizeKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { user_id: 1, toString: Object.prototype.toString };
    const result = camelizeKeys(input);
    expect(result).toHaveProperty('userId', 1);
    expect(result).toHaveProperty('toString');
    expect(result.toString).toBe(Object.prototype.toString);
  });
});

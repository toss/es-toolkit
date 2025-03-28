import { describe, expect, it } from 'vitest';
import { snakeizeKeys } from './snakeizeKeys';

describe('snakeizeKeys', () => {
  it('should convert camelCase keys to snake_case in a flat object', () => {
    const input = { userId: 1, firstName: 'John', lastName: 'Doe' };
    const expected = { user_id: 1, first_name: 'John', last_name: 'Doe' };
    expect(snakeizeKeys(input)).toEqual(expected);
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
    expect(snakeizeKeys(input)).toEqual(expected);
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
    expect(snakeizeKeys(input)).toEqual(expected);
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
    expect(snakeizeKeys(input)).toEqual(expected);
  });

  it('should not modify primitive values', () => {
    expect(snakeizeKeys(123)).toBe(123);
    expect(snakeizeKeys('string')).toBe('string');
    expect(snakeizeKeys(null)).toBe(null);
    expect(snakeizeKeys(undefined)).toBe(undefined);
    expect(snakeizeKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(snakeizeKeys({})).toEqual({});
    expect(snakeizeKeys([])).toEqual([]);
  });

  it('should preserve object prototype methods', () => {
    const input = { userId: 1, toString: Object.prototype.toString };
    const result = snakeizeKeys(input);
    expect(result).toHaveProperty('user_id', 1);
    expect(result).toHaveProperty('toString');
    expect(result.toString).toBe(Object.prototype.toString);
  });
});

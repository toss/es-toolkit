import { describe, expect, it } from 'vitest';
import { toSnakeObject } from './toSnakeObject';

describe('toSnakeObject', () => {
  it('should convert object keys to snake_case', () => {
    const input = {
      firstName: 'Gweesin',
      lastName: 'Chan',
      emailAddress: 'john@example.com',
    };

    const expected = {
      first_name: 'Gweesin',
      last_name: 'Chan',
      email_address: 'john@example.com',
    };

    expect(toSnakeObject(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const input = {
      userInfo: {
        firstName: 'Gweesin',
        lastName: 'Chan',
        contactDetails: {
          emailAddress: 'john@example.com',
          phoneNumber: '123-456-7890',
        },
      },
    };

    const expected = {
      user_info: {
        first_name: 'Gweesin',
        last_name: 'Chan',
        contact_details: {
          email_address: 'john@example.com',
          phone_number: '123-456-7890',
        },
      },
    };

    expect(toSnakeObject(input)).toEqual(expected);
  });

  it('should handle arrays', () => {
    const input = {
      userList: [
        { firstName: 'Gweesin', lastName: 'Chan' },
        { firstName: 'Jane', lastName: 'Smith' },
      ],
    };

    const expected = {
      user_list: [
        { first_name: 'Gweesin', last_name: 'Chan' },
        { first_name: 'Jane', last_name: 'Smith' },
      ],
    };

    expect(toSnakeObject(input)).toEqual(expected);
  });

  it('should not modify the original object', () => {
    const input = {
      firstName: 'Gweesin',
      contactInfo: {
        emailAddress: 'john@example.com',
      },
    };

    const originalInput = { ...input };
    toSnakeObject(input);

    expect(input).toEqual(originalInput);
  });
});

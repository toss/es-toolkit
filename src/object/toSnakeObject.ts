import { snakeCase } from '../string/snakeCase.ts';

/**
 * Converts the keys of an object to snake_case.
 * This function does not mutate the original object.
 *
 * @param {T} obj - The object whose keys will be converted to snake_case.
 * @returns {T} A new object with keys in snake_case.
 *
 * @template T - Type of the object.
 *
 * @example
 * const user = {
 *   firstName: 'John',
 *   lastName: 'Doe', 
 *   contactInfo: {
 *     emailAddress: 'john@example.com',
 *     phoneNumber: '123-456-7890'
 *   }
 * };
 * 
 * const formattedUser = toSnakeObject(user);
 * console.log(formattedUser);
 * // Output: {
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   contact_info: {
 * //     email_address: 'john@example.com', 
 * //     phone_number: '123-456-7890'
 * //   }
 * // }
 */
export function toSnakeObject<T extends Record<PropertyKey, any>>(obj: T): Record<string, any> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeObject(item));
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = snakeCase(key);
    result[newKey] = toSnakeObject(value);
  }

  return result;
}

import { describe, expectTypeOf, it } from 'vitest';
import type { ToCamelCaseKeys } from './ToCamelCaseKeys';

describe('ToCamelCaseKeys', () => {
  it('converts snake_case keys to camelCase', () => {
    expectTypeOf<ToCamelCaseKeys<{ user_id: number; first_name: string }>>().toEqualTypeOf<{
      userId: number;
      firstName: string;
    }>();
  });

  it('converts PascalCase and uppercase keys to camelCase', () => {
    expectTypeOf<ToCamelCaseKeys<{ FirstName: string; URL: string }>>().toEqualTypeOf<{
      firstName: string;
      url: string;
    }>();
  });

  it('converts keys of nested objects and arrays recursively', () => {
    expectTypeOf<ToCamelCaseKeys<{ user_data: { user_id: number } }>>().toEqualTypeOf<{
      userData: { userId: number };
    }>();
    expectTypeOf<ToCamelCaseKeys<Array<{ user_id: number }>>>().toEqualTypeOf<Array<{ userId: number }>>();
  });

  it('leaves built-in objects and primitives unchanged', () => {
    expectTypeOf<ToCamelCaseKeys<{ created_at: Date; tag_set: Set<string> }>>().toEqualTypeOf<{
      createdAt: Date;
      tagSet: Set<string>;
    }>();
    expectTypeOf<ToCamelCaseKeys<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<ToCamelCaseKeys<string>>().toEqualTypeOf<string>();
  });
});

import { describe, expectTypeOf, it } from 'vitest';
import type { ToSnakeCaseKeys } from './ToSnakeCaseKeys';

describe('ToSnakeCaseKeys', () => {
  it('converts camelCase keys to snake_case', () => {
    expectTypeOf<ToSnakeCaseKeys<{ userId: number; firstName: string }>>().toEqualTypeOf<{
      user_id: number;
      first_name: string;
    }>();
  });

  it('converts uppercase keys to lowercase', () => {
    expectTypeOf<ToSnakeCaseKeys<{ URL: string }>>().toEqualTypeOf<{ url: string }>();
  });

  it('converts keys of nested objects and arrays recursively', () => {
    expectTypeOf<ToSnakeCaseKeys<{ userData: { userId: number } }>>().toEqualTypeOf<{
      user_data: { user_id: number };
    }>();
    expectTypeOf<ToSnakeCaseKeys<Array<{ userId: number }>>>().toEqualTypeOf<Array<{ user_id: number }>>();
  });

  it('leaves built-in objects and primitives unchanged', () => {
    expectTypeOf<ToSnakeCaseKeys<{ createdAt: Date; tagSet: Set<string> }>>().toEqualTypeOf<{
      created_at: Date;
      tag_set: Set<string>;
    }>();
    expectTypeOf<ToSnakeCaseKeys<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<ToSnakeCaseKeys<string>>().toEqualTypeOf<string>();
  });
});

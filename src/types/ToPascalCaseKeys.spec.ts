import { describe, expectTypeOf, it } from 'vitest';
import type { ToPascalCaseKeys } from './ToPascalCaseKeys';

describe('ToPascalCaseKeys', () => {
  it('converts camelCase and snake_case keys to PascalCase', () => {
    expectTypeOf<ToPascalCaseKeys<{ userId: number; first_name: string }>>().toEqualTypeOf<{
      UserId: number;
      FirstName: string;
    }>();
  });

  it('converts uppercase keys to capitalized lowercase', () => {
    expectTypeOf<ToPascalCaseKeys<{ URL: string }>>().toEqualTypeOf<{ Url: string }>();
  });

  it('converts keys of nested objects and arrays recursively', () => {
    expectTypeOf<ToPascalCaseKeys<{ userData: { userId: number } }>>().toEqualTypeOf<{
      UserData: { UserId: number };
    }>();
    expectTypeOf<ToPascalCaseKeys<Array<{ userId: number }>>>().toEqualTypeOf<Array<{ UserId: number }>>();
  });

  it('leaves built-in objects and primitives unchanged', () => {
    expectTypeOf<ToPascalCaseKeys<{ createdAt: Date; tagSet: Set<string> }>>().toEqualTypeOf<{
      CreatedAt: Date;
      TagSet: Set<string>;
    }>();
    expectTypeOf<ToPascalCaseKeys<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<ToPascalCaseKeys<string>>().toEqualTypeOf<string>();
  });
});

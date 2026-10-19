import { describe, expectTypeOf, it } from 'vitest';
import type { ToConstantCaseKeys } from './ToConstantCaseKeys';

describe('ToConstantCaseKeys', () => {
  it('converts camelCase and snake_case keys to CONSTANT_CASE', () => {
    expectTypeOf<ToConstantCaseKeys<{ userId: number; first_name: string }>>().toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
    }>();
  });

  it('converts lowercase keys to uppercase', () => {
    expectTypeOf<ToConstantCaseKeys<{ url: string }>>().toEqualTypeOf<{ URL: string }>();
  });

  it('converts keys of nested objects and arrays recursively', () => {
    expectTypeOf<ToConstantCaseKeys<{ userData: { userId: number } }>>().toEqualTypeOf<{
      USER_DATA: { USER_ID: number };
    }>();
    expectTypeOf<ToConstantCaseKeys<Array<{ userId: number }>>>().toEqualTypeOf<Array<{ USER_ID: number }>>();
  });

  it('leaves built-in objects and primitives unchanged', () => {
    expectTypeOf<ToConstantCaseKeys<{ createdAt: Date; tagSet: Set<string> }>>().toEqualTypeOf<{
      CREATED_AT: Date;
      TAG_SET: Set<string>;
    }>();
    expectTypeOf<ToConstantCaseKeys<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<ToConstantCaseKeys<string>>().toEqualTypeOf<string>();
  });
});

import { describe, expectTypeOf, it } from 'vitest';
import type { ToKebabCaseKeys } from './ToKebabCaseKeys';

describe('ToKebabCaseKeys', () => {
  it('converts camelCase and snake_case keys to kebab-case', () => {
    expectTypeOf<ToKebabCaseKeys<{ userId: number; first_name: string }>>().toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
    }>();
  });

  it('converts uppercase keys to lowercase', () => {
    expectTypeOf<ToKebabCaseKeys<{ URL: string }>>().toEqualTypeOf<{ url: string }>();
  });

  it('converts keys of nested objects and arrays recursively', () => {
    expectTypeOf<ToKebabCaseKeys<{ userData: { userId: number } }>>().toEqualTypeOf<{
      'user-data': { 'user-id': number };
    }>();
    expectTypeOf<ToKebabCaseKeys<Array<{ userId: number }>>>().toEqualTypeOf<Array<{ 'user-id': number }>>();
  });

  it('leaves built-in objects and primitives unchanged', () => {
    expectTypeOf<ToKebabCaseKeys<{ createdAt: Date; tagSet: Set<string> }>>().toEqualTypeOf<{
      'created-at': Date;
      'tag-set': Set<string>;
    }>();
    expectTypeOf<ToKebabCaseKeys<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<ToKebabCaseKeys<string>>().toEqualTypeOf<string>();
  });
});

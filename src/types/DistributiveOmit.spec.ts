import { describe, expectTypeOf, it } from 'vitest';
import type { DistributiveOmit } from './index';

describe('DistributiveOmit', () => {
  it('removes the given keys from an object', () => {
    type User = { id: number; name: string; email: string };
    expectTypeOf<DistributiveOmit<User, 'email'>>().toEqualTypeOf<{ id: number; name: string }>();
    expectTypeOf<DistributiveOmit<User, 'name' | 'email'>>().toEqualTypeOf<{ id: number }>();
  });

  it('preserves properties specific to each union member', () => {
    type Card = { kind: 'card'; cardNo: string; note: string };
    type Bank = { kind: 'bank'; accountNo: string; note: string };
    expectTypeOf<DistributiveOmit<Card | Bank, 'note'>>().toEqualTypeOf<
      { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string }
    >();
    expectTypeOf<Omit<Card | Bank, 'note'>>().toEqualTypeOf<{ kind: 'card' | 'bank' }>();
  });

  it('removes keys that exist in only some union members', () => {
    type Payment = { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string };
    expectTypeOf<DistributiveOmit<Payment, 'cardNo'>>().toEqualTypeOf<
      { kind: 'card' } | { kind: 'bank'; accountNo: string }
    >();
  });

  it('ignores missing keys and removes keys assignable to the given type', () => {
    type User = { id: number; name: string };
    expectTypeOf<DistributiveOmit<User, 'missing'>>().toEqualTypeOf<User>();
    expectTypeOf<DistributiveOmit<User, 'name' | 'missing'>>().toEqualTypeOf<{ id: number }>();
    expectTypeOf<DistributiveOmit<User, unknown>>().toEqualTypeOf<Record<never, never>>();
  });

  it('preserves readonly and optional modifiers', () => {
    type User = { readonly id: number; name?: string; email: string };
    expectTypeOf<DistributiveOmit<User, 'email'>>().toEqualTypeOf<{ readonly id: number; name?: string }>();
  });

  it('removes numeric and symbol keys', () => {
    const key = Symbol('key');
    type Record = { 0: string; [key]: boolean; name: string };
    expectTypeOf<DistributiveOmit<Record, 0 | typeof key>>().toEqualTypeOf<{ name: string }>();
  });

  it('preserves each member when the keys to remove are never', () => {
    type Payment = { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string };
    expectTypeOf<DistributiveOmit<Payment, never>>().toEqualTypeOf<Payment>();
  });

  it('returns an empty object type when all keys are removed or the input is empty', () => {
    expectTypeOf<DistributiveOmit<{ id: number }, 'id'>>().toEqualTypeOf<Record<never, never>>();
    expectTypeOf<DistributiveOmit<Record<never, never>, 'id'>>().toEqualTypeOf<Record<never, never>>();
  });

  it('preserves never', () => {
    expectTypeOf<DistributiveOmit<never, 'id'>>().toEqualTypeOf<never>();
  });
});

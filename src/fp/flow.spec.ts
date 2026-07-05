import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { filter } from './array/filter.ts';
import { map } from './array/map.ts';
import { take } from './array/take.ts';
import { flow } from './flow.ts';
import { pipe } from './pipe.ts';

describe('flow', () => {
  it('returns its single argument unchanged when no functions are given', () => {
    // No public overload accepts zero functions, but the runtime is defined for
    // it; cast to exercise the identity behaviour.
    const identity = (flow as () => (value: number) => number)();
    expect(identity(42)).toBe(42);
  });

  it('lets the first function take multiple arguments', () => {
    const combined = flow(
      (x: number, y: number) => x + y,
      (n: number) => n * n
    );

    expect(combined(1, 2)).toBe(9);
  });

  it('passes the first function its full argument list', () => {
    const combined = flow(
      (a: number, b: number, c: number) => a + b + c,
      (n: number) => n * 2
    );

    expect(combined(1, 2, 3)).toBe(12);
  });

  it('composes several unary functions left-to-right', () => {
    const combined = flow(
      (x: number) => x + 1,
      x => x * 3,
      x => `value: ${x}`
    );

    expect(combined(1)).toBe('value: 6');
  });

  it('works with arbitrary unary functions', () => {
    const normalize = flow(
      (s: string) => s.trim(),
      s => s.toLowerCase()
    );

    expect(normalize('  Hello  ')).toBe('hello');
  });

  it('produces the same result as pipe for a lazy operator chain', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];

    const pipeline = flow(
      map((x: number) => x * x),
      filter(x => x % 2 === 0),
      take(2)
    );

    expect(pipeline(data)).toEqual(
      pipe(
        data,
        map((x: number) => x * x),
        filter(x => x % 2 === 0),
        take(2)
      )
    );
    expect(pipeline(data)).toEqual([4, 16]);
  });

  it('keeps a leading lazy operator inside the fused, short-circuiting run', () => {
    const mapSpy = vi.fn((x: number) => x * x);

    const pipeline = flow(
      map(mapSpy),
      filter(x => x % 2 === 0),
      take(2)
    );

    expect(pipeline([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([4, 16]);
    // Fused with `take(2)`, the walk stops after the fourth element rather than
    // mapping the whole array — exactly as `pipe` would.
    expect(mapSpy).toHaveBeenCalledTimes(4);
  });

  it('returns a reusable function that can be called many times', () => {
    const double = flow((x: number) => x * 2);

    expect(double(1)).toBe(2);
    expect(double(2)).toBe(4);
    expect(double(3)).toBe(6);
  });

  it('infers the first function parameters and the final return type', () => {
    const combined = flow(
      (x: number, y: string) => x + y.length,
      (n: number) => n > 0,
      (b: boolean): string => (b ? 'yes' : 'no')
    );

    expectTypeOf(combined).parameters.toEqualTypeOf<[number, string]>();
    expectTypeOf(combined).returns.toEqualTypeOf<string>();
  });
});

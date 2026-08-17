import { describe, expect, expectTypeOf, it } from 'vitest';
import { filter } from './array/filter.ts';
import { map } from './array/map.ts';
import { take } from './array/take.ts';
import { flowAsync } from './flowAsync.ts';

describe('flowAsync', () => {
  it('resolves to its single argument unchanged when no functions are given', async () => {
    // No public overload accepts zero functions, but the runtime is defined for
    // it; cast to exercise the identity behaviour.
    const identity = (flowAsync as () => (value: number) => Promise<number>)();
    await expect(identity(42)).resolves.toBe(42);
  });

  it('awaits a promise before passing it to the next function', async () => {
    const fetchUser = async (id: number) => ({ id, name: 'Alice' });
    const getName = (user: { name: string }) => user.name;

    const getUserName = flowAsync(fetchUser, getName);

    await expect(getUserName(1)).resolves.toBe('Alice');
  });

  it('lets the first function take multiple arguments', async () => {
    const combined = flowAsync(
      async (x: number, y: number) => x + y,
      (n: number) => n * n
    );

    await expect(combined(1, 2)).resolves.toBe(9);
  });

  it('composes several sync functions into an async function', async () => {
    const combined = flowAsync(
      (x: number) => x + 1,
      x => x * 3,
      x => `value: ${x}`
    );

    await expect(combined(1)).resolves.toBe('value: 6');
  });

  it('mixes sync and async functions freely', async () => {
    const combined = flowAsync(
      (x: number) => x + 1,
      async x => x * 3,
      x => `value: ${x}`,
      async s => s.toUpperCase()
    );

    await expect(combined(1)).resolves.toBe('VALUE: 6');
  });

  it('awaits every step in order', async () => {
    const calls: string[] = [];

    const combined = flowAsync(
      async (x: number) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        calls.push('first');
        return x + 1;
      },
      async x => {
        calls.push('second');
        return x * 2;
      }
    );

    await expect(combined(1)).resolves.toBe(4);
    expect(calls).toEqual(['first', 'second']);
  });

  it('works with es-toolkit/fp operators', async () => {
    const pipeline = flowAsync(
      async (data: number[]) => data,
      map((x: number) => x * x),
      filter(x => x % 2 === 0),
      take(2)
    );

    await expect(pipeline([1, 2, 3, 4, 5, 6, 7, 8])).resolves.toEqual([4, 16]);
  });

  it('rejects when a composed function throws', async () => {
    const combined = flowAsync(
      async (x: number) => x + 1,
      () => {
        throw new Error('boom');
      }
    );

    await expect(combined(1)).rejects.toThrow('boom');
  });

  it('rejects when a composed function returns a rejected promise', async () => {
    const combined = flowAsync(
      (x: number) => x + 1,
      async () => {
        throw new Error('boom');
      }
    );

    await expect(combined(1)).rejects.toThrow('boom');
  });

  it('returns a reusable function that can be called many times', async () => {
    const double = flowAsync(async (x: number) => x * 2);

    await expect(double(1)).resolves.toBe(2);
    await expect(double(2)).resolves.toBe(4);
    await expect(double(3)).resolves.toBe(6);
  });

  it('infers the first function parameters and the awaited final return type', () => {
    const combined = flowAsync(
      async (x: number, y: string) => x + y.length,
      (n: number) => n > 0,
      async (b: boolean): Promise<string> => (b ? 'yes' : 'no')
    );

    expectTypeOf(combined).parameters.toEqualTypeOf<[number, string]>();
    expectTypeOf(combined).returns.toEqualTypeOf<Promise<string>>();
  });
});

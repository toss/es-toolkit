import { bench, describe } from 'vitest';
import { memoizePromise } from 'es-toolkit';

describe('memoizePromise', () => {
  bench('shares concurrent calls and caches the resolved value', async () => {
    const memoized = memoizePromise(async (value: number) => value);

    await Promise.all([memoized(1), memoized(1)]);
    await memoized(1);
  });
});

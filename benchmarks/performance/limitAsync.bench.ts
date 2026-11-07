import { bench, describe } from 'vitest';
import { limitAsync as limitAsyncToolkit } from 'es-toolkit';

describe('limitAsync', () => {
  const ids = Array.from({ length: 100 }, (_, i) => i);
  const identity = limitAsyncToolkit(async (id: number) => id, 10);

  bench('es-toolkit/limitAsync', async () => {
    await Promise.all(ids.map(id => identity(id)));
  });
});

describe('limitAsync/largeArray', () => {
  const ids = Array.from({ length: 30_000 }, (_, i) => i);
  const identity = limitAsyncToolkit(async (id: number) => id, 10);

  bench('es-toolkit/limitAsync', async () => {
    await Promise.all(ids.map(id => identity(id)));
  });
});

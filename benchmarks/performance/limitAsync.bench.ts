import { limitAsync as limitAsyncToolkit } from 'es-toolkit';
import { bench, group } from './harness.ts';

group('limitAsync', () => {
  const ids = Array.from({ length: 100 }, (_, i) => i);
  const identity = limitAsyncToolkit(async (id: number) => id, 10);

  bench('es-toolkit/limitAsync', async () => {
    await Promise.all(ids.map(id => identity(id)));
  });
});

group('limitAsync/largeArray', () => {
  const ids = Array.from({ length: 30_000 }, (_, i) => i);
  const identity = limitAsyncToolkit(async (id: number) => id, 10);

  bench('es-toolkit/limitAsync', async () => {
    await Promise.all(ids.map(id => identity(id)));
  });
});

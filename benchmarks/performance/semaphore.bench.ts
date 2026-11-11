import { Semaphore as SemaphoreToolkit } from 'es-toolkit';
import { bench, group } from './harness.ts';

async function drainSemaphore(waiterCount: number) {
  const semaphore = new SemaphoreToolkit(1);

  await semaphore.acquire();

  const waiters: Array<Promise<void>> = [];

  for (let i = 0; i < waiterCount; i++) {
    waiters.push(semaphore.acquire());
  }

  for (let i = 0; i < waiterCount; i++) {
    semaphore.release();
  }

  await Promise.all(waiters);
}

group('Semaphore', () => {
  bench('es-toolkit/Semaphore', async () => {
    await drainSemaphore(10);
  });
});

group('Semaphore/contention', () => {
  const semaphore = new SemaphoreToolkit(1);

  async function task() {
    await semaphore.acquire();

    try {
      await Promise.resolve();
    } finally {
      semaphore.release();
    }
  }

  bench('es-toolkit/Semaphore', async () => {
    await Promise.all([task(), task(), task()]);
  });
});

group('Semaphore/largeQueue', () => {
  bench('es-toolkit/Semaphore', async () => {
    await drainSemaphore(30_000);
  });
});

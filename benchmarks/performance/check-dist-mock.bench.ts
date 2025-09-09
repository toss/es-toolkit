import { bench, describe } from 'vitest';

const mockCreatePackageTarball = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ path: '/tmp/mock-package.tgz' });
    }, 50);
  });
};

const mockProcessTarball = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ exports: { '.': {}, './array': {}, './object': {} } });
    }, 10);
  });
};

describe('check-dist performance comparison (mocked)', () => {
  bench('Original approach: Duplicate tarball creation', async () => {
    await mockCreatePackageTarball();
    await mockProcessTarball();

    await mockCreatePackageTarball();
    await mockProcessTarball();
  });

  bench('Optimized approach: Shared tarball creation', async () => {
    const sharedTarball = await mockCreatePackageTarball();
    void sharedTarball;

    await mockProcessTarball();
    await mockProcessTarball();
  });
});

describe('function call overhead comparison', () => {
  const createTarball = () => ({ path: '/tmp/test.tgz' });
  const processTarball = () => ({ exports: {} });

  bench('Original: Function calls with recreation', () => {
    createTarball();
    processTarball();

    createTarball();
    processTarball();
  });

  bench('Optimized: Function calls with reuse', () => {
    const sharedTarball = createTarball();
    void sharedTarball;

    processTarball();
    processTarball();
  });
});

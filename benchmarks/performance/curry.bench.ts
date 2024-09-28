import { bench, describe } from 'vitest';
import { curry as curryToolkit } from 'es-toolkit';
import { curry as curryCompat } from 'es-toolkit/compat';
import { curry as curryLodash } from 'lodash';

describe('curry', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curry', () => {
    curryToolkit(fn)(1)('a')(true);
  });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1)('a')(true);
  });

  bench('lodash/curry', () => {
    curryLodash(fn)(1)('a')(true);
  });
});

describe('curry - compat', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1, 'a', true);
  });

  bench('lodash/curry', () => {
    curryLodash(fn)(1, 'a', true);
  });
});

describe('curry - compat with placeholder', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1, curryCompat.placeholder, true)('a');
  });

  bench('lodash/curry', () => {
    curryLodash(fn)(1, curryLodash.placeholder, true)('a');
  });
});

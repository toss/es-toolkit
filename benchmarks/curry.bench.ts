import { bench, describe } from 'vitest';
import { curry as curryToolkit } from 'es-toolkit';
import { curry as curryLodash } from 'lodash';

describe('curry', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curry', () => {
    curryToolkit(fn)(1)('a')(true);
  });

  bench('lodash/curry', () => {
    curryLodash(fn)(1)('a')(true);
  });
});

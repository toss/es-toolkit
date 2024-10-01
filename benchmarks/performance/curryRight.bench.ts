import { bench, describe } from 'vitest';
import { curryRight as curryRightToolkit } from 'es-toolkit';
import { curryRight as curryRightLodash } from 'lodash';

const curryRight = curryRightToolkit;
const curryRightLo = curryRightLodash;

describe('curryRight', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curry', () => {
    curryRight(fn)(1)('a')(true);
  });

  bench('lodash/curry', () => {
    curryRightLo(fn)(1)('a')(true);
  });
});

import { bench, describe } from 'vitest';
import { curryRight as curryRightToolkit_ } from 'es-toolkit';
import { curryRight as curryRightToolkitCompat_ } from 'es-toolkit/compat';
import { curryRight as curryRightLodash_ } from 'lodash';

const curryRightToolkit = curryRightToolkit_;
const curryRightToolkitCompat = curryRightToolkitCompat_;
const curryRightLodash = curryRightLodash_;

describe('curryRight', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curryRight', () => {
    curryRightToolkit(fn)(true)('a')(1);
  });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true)('a')(1);
  });

  bench('lodash/curryRight', () => {
    curryRightLodash(fn)(true)('a')(1);
  });
});

describe('curryRight - compat', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true, 'a', 1);
  });

  bench('lodash/curryRight', () => {
    curryRightLodash(fn)(true, 'a', 1);
  });
});

describe('curryRight - compat with placeholder', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true, curryRightToolkitCompat.placeholder, 1)('a');
  });

  bench('lodash/curryRight', () => {
    curryRightLodash(fn)(true, curryRightLodash.placeholder, 1)('a');
  });
});

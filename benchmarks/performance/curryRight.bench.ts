import { curryRight as curryRightToolkit } from 'es-toolkit';
import { curryRight as curryRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('curryRight', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curryRight', () => {
    curryRightToolkit(fn)(true)('a')(1);
  });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true)('a')(1);
  });

  bench('lodash/curryRight', () => {
    lodash.curryRight(fn)(true)('a')(1);
  });
});

group('curryRight - compat', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true)(1, 'a');
  });

  bench('lodash/curryRight', () => {
    lodash.curryRight(fn)(true)(1, 'a');
  });
});

group('curryRight - compat with placeholder', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    curryRightToolkitCompat(fn)(true)(1, curryRightToolkitCompat.placeholder)('a');
  });

  bench('lodash/curryRight', () => {
    lodash.curryRight(fn)(true)(1, lodash.curryRight.placeholder)('a');
  });
});

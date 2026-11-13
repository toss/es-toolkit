import { curryRight as curryRightToolkit } from 'es-toolkit';
import { curryRight as curryRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('curryRight', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curryRight', () => {
    do_not_optimize(curryRightToolkit(fn)(true)('a')(1));
  });

  bench('es-toolkit/compat/curryRight', () => {
    do_not_optimize(curryRightToolkitCompat(fn)(true)('a')(1));
  });

  bench('lodash/curryRight', () => {
    do_not_optimize(lodash.curryRight(fn)(true)('a')(1));
  });
});

group('curryRight - compat', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    do_not_optimize(curryRightToolkitCompat(fn)(true)(1, 'a'));
  });

  bench('lodash/curryRight', () => {
    do_not_optimize(lodash.curryRight(fn)(true)(1, 'a'));
  });
});

group('curryRight - compat with placeholder', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curryRight', () => {
    do_not_optimize(curryRightToolkitCompat(fn)(true)(1, curryRightToolkitCompat.placeholder)('a'));
  });

  bench('lodash/curryRight', () => {
    do_not_optimize(lodash.curryRight(fn)(true)(1, lodash.curryRight.placeholder)('a'));
  });
});

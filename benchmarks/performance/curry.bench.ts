import { curry as curryToolkit } from 'es-toolkit';
import { curry as curryCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('curry', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/curry', () => {
    curryToolkit(fn)(1)('a')(true);
  });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1)('a')(true);
  });

  bench('lodash/curry', () => {
    lodash.curry(fn)(1)('a')(true);
  });
});

group('curry - compat', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1, 'a', true);
  });

  bench('lodash/curry', () => {
    lodash.curry(fn)(1, 'a', true);
  });
});

group('curry - compat with placeholder', () => {
  const fn = (a: number, b: string, c: boolean) => ({ a, b, c });

  bench('es-toolkit/compat/curry', () => {
    curryCompat(fn)(1, curryCompat.placeholder, true)('a');
  });

  bench('lodash/curry', () => {
    lodash.curry(fn)(1, lodash.curry.placeholder, true)('a');
  });
});

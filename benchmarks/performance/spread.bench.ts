import { spread as spreadToolkit } from 'es-toolkit';
import { spread as spreadCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('spread', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/spread', () => {
    spreadToolkit(fn);
  });

  bench('es-toolkit/compat/spread', () => {
    spreadCompat(fn, 1);
  });

  bench('lodash/spread', () => {
    lodash.spread(fn, 1);
  });
});

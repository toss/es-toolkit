import { rest as restToolkit } from 'es-toolkit';
import { rest as restCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('rest', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/rest', () => {
    do_not_optimize(restToolkit(fn, 1));
  });

  bench('es-toolkit/compat/rest', () => {
    do_not_optimize(restCompat(fn, 1));
  });

  bench('lodash/rest', () => {
    do_not_optimize(lodash.rest(fn, 1));
  });
});

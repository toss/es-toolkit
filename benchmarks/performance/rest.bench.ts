import { bench, describe } from 'vitest';
import { rest as restToolkit } from 'es-toolkit';
import { rest as restCompat } from 'es-toolkit/compat';
import { rest as restLodash } from 'lodash';

describe('rest', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/rest', () => {
    restToolkit(fn, 1);
  });

  bench('es-toolkit/compat/rest', () => {
    restCompat(fn, 1);
  });

  bench('lodash/rest', () => {
    restLodash(fn, 1);
  });
});

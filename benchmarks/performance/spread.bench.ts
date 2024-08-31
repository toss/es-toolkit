import { bench, describe } from 'vitest';
import { spread as spreadToolkit } from 'es-toolkit';
import { spread as spreadCompat } from 'es-toolkit/compat';
import { spread as spreadLodash } from 'lodash';

describe('spread', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/spread', () => {
    spreadToolkit(fn, 1);
  });

  bench('es-toolkit/compat/spread', () => {
    spreadCompat(fn, 1);
  });

  bench('lodash/spread', () => {
    spreadLodash(fn, 1);
  });
});

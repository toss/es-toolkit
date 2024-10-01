import { bench, describe } from 'vitest';
import { spread as spreadToolkit_ } from 'es-toolkit';
import { spread as spreadCompat_ } from 'es-toolkit/compat';
import { spread as spreadLodash_ } from 'lodash';

const spreadToolkit = spreadToolkit_;
const spreadCompat = spreadCompat_;
const spreadLodash = spreadLodash_;

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

import { bench, describe } from 'vitest';
import { pickBy as pickByToolkit } from 'es-toolkit';
import { pickBy as pickByCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { pickBy: pickByLodash } = lodash;

describe('pickBy', () => {
  bench('es-toolkit/pickBy', () => {
    pickByToolkit({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number');
  });

  bench('es-toolkit/compat/pickBy', () => {
    pickByCompat({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number');
  });

  bench('lodash/pickBy', () => {
    pickByLodash({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number');
  });
});

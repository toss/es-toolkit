import { bench, describe } from 'vitest';
import { pickBy as pickByToolkit_ } from 'es-toolkit';
import { pickBy as pickByCompat_ } from 'es-toolkit/compat';
import { pickBy as pickByLodash_ } from 'lodash';

const pickByToolkit = pickByToolkit_;
const pickByCompat = pickByCompat_;
const pickByLodash = pickByLodash_;

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

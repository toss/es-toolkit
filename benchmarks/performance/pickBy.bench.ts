import { pickBy as pickByToolkit } from 'es-toolkit';
import { pickBy as pickByLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('pickBy', () => {
  bench('es-toolkit/pickBy', () => {
    pickByToolkit({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number');
  });

  bench('lodash/pickBy', () => {
    pickByLodash({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number');
  });
});

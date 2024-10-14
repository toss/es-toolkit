import { omitBy as omitByToolkit } from 'es-toolkit';
import { omitBy as omitByLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('omitBy', () => {
  const obj = { a: 1, b: 'omit', c: 3, d: 'test', e: 0 };
  const shouldOmit = (value: number | string) => typeof value === 'string';

  bench('es-toolkit/omitBy', () => {
    omitByToolkit(obj, shouldOmit);
  });

  bench('lodash/omitBy', () => {
    omitByLodash(obj, shouldOmit);
  });
});

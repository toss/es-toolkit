import { omitBy as omitByToolkit } from 'es-toolkit';
import { omitBy as omitByLodash } from 'lodash';
import { bench, describe } from 'vitest';

describe('omitBy', () => {
  bench('es-toolkit/omitBy', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const shouldOmit = (value: number | string) => typeof value === 'string';
    omitByToolkit(obj, shouldOmit);
  });

  bench('lodash/omitBy', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const shouldOmit = (value: number | string) => typeof value === 'string';
    omitByLodash(obj, shouldOmit);
  });
});

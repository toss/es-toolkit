import { bench, describe } from 'vitest';
import { omitBy as omitByToolkit_ } from 'es-toolkit';
import { omitBy as omitByLodash_ } from 'lodash';

const omitByToolkit = omitByToolkit_;
const omitByLodash = omitByLodash_;

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

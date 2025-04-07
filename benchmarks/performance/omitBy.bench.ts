import { bench, describe } from 'vitest';
import { omitBy as omitByToolkit_ } from 'es-toolkit';
import { isString } from 'es-toolkit';
import { omitBy as omitByLodash_ } from 'lodash';

const omitByToolkit = omitByToolkit_;
const omitByLodash = omitByLodash_;

describe('omitBy', () => {
  const obj = { a: 1, b: 'omit', c: 3, d: 'test', e: 0 };
  const shouldOmit = (value: number | string) => isString(value);

  bench('es-toolkit/omitBy', () => {
    omitByToolkit(obj, shouldOmit);
  });

  bench('lodash/omitBy', () => {
    omitByLodash(obj, shouldOmit);
  });
});

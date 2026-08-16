import { bench, describe } from 'vitest';
import { omitBy as omitByToolkit } from 'es-toolkit';
import { omitBy as omitByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { omitBy: omitByLodash } = lodash;

describe('omitBy', () => {
  const obj = { a: 1, b: 'omit', c: 3, d: 'test', e: 0 };
  const shouldOmit = (value: number | string) => typeof value === 'string';

  bench('es-toolkit/omitBy', () => {
    omitByToolkit(obj, shouldOmit);
  });

  bench('es-toolkit/compat/omitBy', () => {
    omitByToolkitCompat(obj, shouldOmit);
  });

  bench('lodash/omitBy', () => {
    omitByLodash(obj, shouldOmit);
  });
});

import { bench, describe } from 'vitest';
import { defaultTo as defaultToToolkitCompat_ } from 'es-toolkit/compat';
import { defaultTo as defaultToLodash_ } from 'lodash';

const defaultToToolkitCompat = defaultToToolkitCompat_;
const defaultToLodash = defaultToLodash_;

describe('defaultTo', () => {
  bench('es-toolkit/compat/defaultTo', () => {
    defaultToToolkitCompat(null, 123);
    defaultToToolkitCompat(undefined, '64');
    defaultToToolkitCompat(NaN, 0);
    defaultToToolkitCompat(true, 0);
    defaultToToolkitCompat(123, 0);
  });

  bench('lodash/defaultTo', () => {
    defaultToLodash(null, 123);
    defaultToLodash(undefined, '64');
    defaultToLodash(NaN, 0);
    defaultToLodash(true, 0);
    defaultToLodash(123, 0);
  });
});

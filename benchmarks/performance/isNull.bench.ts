import { bench, describe } from 'vitest';
import { isNull as isNullToolkit } from 'es-toolkit';
import { isNull as isNullToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isNull: isNullLodash } = lodash;

describe('isNull', () => {
  bench('es-toolkit/isNull', () => {
    isNullToolkit(null);
    isNullToolkit(undefined);
    isNullToolkit('');
    isNullToolkit(123);
  });

  bench('es-toolkit/compat/isNull', () => {
    isNullToolkitCompat(null);
    isNullToolkitCompat(undefined);
    isNullToolkitCompat('');
    isNullToolkitCompat(123);
  });

  bench('lodash/isNull', () => {
    isNullLodash(null);
    isNullLodash(undefined);
    isNullLodash('');
    isNullLodash(123);
  });
});

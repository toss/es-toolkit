import { bench, describe } from 'vitest';
import { isNull as isNullToolkit_ } from 'es-toolkit';
import { isNull as isNullLodash_ } from 'lodash';

const isNullToolkit = isNullToolkit_;
const isNullLodash = isNullLodash_;

describe('isNull', () => {
  bench('es-toolkit/isNull', () => {
    isNullToolkit(null);
    isNullToolkit(undefined);
    isNullToolkit('');
    isNullToolkit(123);
  });

  bench('lodash/isNull', () => {
    isNullLodash(null);
    isNullLodash(undefined);
    isNullLodash('');
    isNullLodash(123);
  });
});

import { bench, describe } from 'vitest';
import { isBoolean as isBooleanToolkit } from 'es-toolkit';
import { isBoolean as isBooleanToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isBoolean: isBooleanLodash } = lodash;

describe('isBoolean', () => {
  bench('es-toolkit/isBoolean', () => {
    isBooleanToolkit(true);
    isBooleanToolkit(false);
    isBooleanToolkit(undefined);
    isBooleanToolkit('');
    isBooleanToolkit(123);
    isBooleanToolkit({});
    isBooleanToolkit(Boolean());
  });

  bench('es-toolkit/compat/isBoolean', () => {
    isBooleanToolkitCompat(true);
    isBooleanToolkitCompat(false);
    isBooleanToolkitCompat(undefined);
    isBooleanToolkitCompat('');
    isBooleanToolkitCompat(123);
    isBooleanToolkitCompat({});
    isBooleanToolkitCompat(Boolean());
  });

  bench('lodash/isBoolean', () => {
    isBooleanLodash(true);
    isBooleanLodash(false);
    isBooleanLodash(undefined);
    isBooleanLodash('');
    isBooleanLodash(123);
    isBooleanLodash({});
    isBooleanLodash(Boolean());
  });
});

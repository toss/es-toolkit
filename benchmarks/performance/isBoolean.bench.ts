import { bench, describe } from 'vitest';
import { isBoolean as isBooleanToolkit } from 'es-toolkit/predicate';
import { isBoolean as isBooleanToolkitCompat } from 'es-toolkit/compat';
import { isBoolean as isBooleanLodash } from 'lodash';

describe('isBoolean', () => {
  bench('es-toolkit/isBoolean', () => {
    isBooleanToolkit(true);
    isBooleanToolkit(false);
    isBooleanToolkit(undefined);
    isBooleanToolkit('');
    isBooleanToolkit(123);
  });

  bench('es-toolkit/compat/isBoolean', () => {
    isBooleanToolkitCompat(true);
    isBooleanToolkitCompat(false);
    isBooleanToolkitCompat(undefined);
    isBooleanToolkitCompat('');
    isBooleanToolkitCompat(123);
  });

  bench('lodash/isBoolean', () => {
    isBooleanLodash(true);
    isBooleanLodash(false);
    isBooleanLodash(undefined);
    isBooleanLodash('');
    isBooleanLodash(123);
  });
});

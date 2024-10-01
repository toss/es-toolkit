import { bench, describe } from 'vitest';
import { isBoolean as isBooleanToolkit_ } from 'es-toolkit';
import { isBoolean as isBooleanToolkitCompat_ } from 'es-toolkit/compat';
import { isBoolean as isBooleanLodash_ } from 'lodash';

const isBooleanToolkit = isBooleanToolkit_;
const isBooleanToolkitCompat = isBooleanToolkitCompat_;
const isBooleanLodash = isBooleanLodash_;

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

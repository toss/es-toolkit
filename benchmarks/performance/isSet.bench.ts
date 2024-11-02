import { bench, describe } from 'vitest';
import { isSet as isSetToolkit_ } from 'es-toolkit';
import { isSet as isSetToolkitCompat_ } from 'es-toolkit/compat';
import { isSet as isSetLodash_ } from 'lodash';

const isSetToolkit = isSetToolkit_;
const isSetToolkitCompat = isSetToolkitCompat_;
const isSetLodash = isSetLodash_;

describe('isSet', () => {
  bench('es-toolkit/isSet', () => {
    isSetToolkit(new Set());
    isSetToolkit(new WeakSet());
    isSetToolkit([]);
    isSetToolkit({});
    isSetToolkit(null);
  });

  bench('es-toolkit/isSetCompat', () => {
    isSetToolkitCompat(new Set());
    isSetToolkitCompat(new WeakSet());
    isSetToolkitCompat([]);
    isSetToolkitCompat({});
    isSetToolkitCompat(null);
  });

  bench('lodash/isSet', () => {
    isSetLodash(new Set());
    isSetLodash(new WeakSet());
    isSetLodash([]);
    isSetLodash({});
    isSetLodash(null);
  });
});

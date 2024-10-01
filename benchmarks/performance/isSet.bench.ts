import { bench, describe } from 'vitest';
import { isSet as isSetToolkit_ } from 'es-toolkit';
import { isSet as isSetLodash_ } from 'lodash';

const isSetToolkit = isSetToolkit_;
const isSetLodash = isSetLodash_;

describe('isSet', () => {
  bench('es-toolkit/isSet', () => {
    isSetToolkit(new Set());
    isSetToolkit(new WeakSet());
    isSetToolkit([]);
    isSetToolkit({});
    isSetToolkit(null);
  });

  bench('lodash/isSet', () => {
    isSetLodash(new Set());
    isSetLodash(new WeakSet());
    isSetLodash([]);
    isSetLodash({});
    isSetLodash(null);
  });
});

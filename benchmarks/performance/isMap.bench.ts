import { bench, describe } from 'vitest';
import { isMap as isMapToolkit_ } from 'es-toolkit';
import { isMap as isMapToolkitCompat_ } from 'es-toolkit/compat';
import { isMap as isMapLodash_ } from 'lodash';

const isMapToolkit = isMapToolkit_;
const isMapToolkitCompat = isMapToolkitCompat_;
const isMapLodash = isMapLodash_;

describe('isMap', () => {
  bench('es-toolkit/isMap', () => {
    isMapToolkit(new Map());
    isMapToolkit(new Map([['key', 'value']]));
    isMapToolkit(new WeakMap());
    isMapToolkit([]);
    isMapToolkit({});
    isMapToolkit(null);
  });

  bench('es-toolkit/compat/isMap', () => {
    isMapToolkitCompat(new Map());
    isMapToolkitCompat(new Map([['key', 'value']]));
    isMapToolkitCompat(new WeakMap());
    isMapToolkitCompat([]);
    isMapToolkitCompat({});
    isMapToolkitCompat(null);
  });

  bench('lodash/isMap', () => {
    isMapLodash(new Map());
    isMapLodash(new Map([['key', 'value']]));
    isMapLodash(new WeakMap());
    isMapLodash([]);
    isMapLodash({});
    isMapLodash(null);
  });
});

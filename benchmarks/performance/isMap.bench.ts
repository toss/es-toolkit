import { bench, describe } from 'vitest';
import { isMap as isMapToolkit } from 'es-toolkit';
import { isMap as isMapLodash } from 'lodash';

describe('isMap', () => {
  bench('es-toolkit/isMap', () => {
    isMapToolkit(new Map());
    isMapToolkit(new Map([['key', 'value']]));
    isMapToolkit(new WeakMap());
    isMapToolkit([]);
    isMapToolkit({});
    isMapToolkit(null);
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

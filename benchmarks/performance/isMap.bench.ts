import { isMap as isMapToolkit } from 'es-toolkit';
import { isMap as isMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isMap', () => {
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
    lodash.isMap(new Map());
    lodash.isMap(new Map([['key', 'value']]));
    lodash.isMap(new WeakMap());
    lodash.isMap([]);
    lodash.isMap({});
    lodash.isMap(null);
  });
});

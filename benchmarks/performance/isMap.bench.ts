import { isMap as isMapToolkit } from 'es-toolkit';
import { isMap as isMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isMap', () => {
  bench('es-toolkit/isMap', () => {
    do_not_optimize(isMapToolkit(new Map()));
    do_not_optimize(isMapToolkit(new Map([['key', 'value']])));
    do_not_optimize(isMapToolkit(new WeakMap()));
    do_not_optimize(isMapToolkit([]));
    do_not_optimize(isMapToolkit({}));
    do_not_optimize(isMapToolkit(null));
  });

  bench('es-toolkit/compat/isMap', () => {
    do_not_optimize(isMapToolkitCompat(new Map()));
    do_not_optimize(isMapToolkitCompat(new Map([['key', 'value']])));
    do_not_optimize(isMapToolkitCompat(new WeakMap()));
    do_not_optimize(isMapToolkitCompat([]));
    do_not_optimize(isMapToolkitCompat({}));
    do_not_optimize(isMapToolkitCompat(null));
  });

  bench('lodash/isMap', () => {
    do_not_optimize(lodash.isMap(new Map()));
    do_not_optimize(lodash.isMap(new Map([['key', 'value']])));
    do_not_optimize(lodash.isMap(new WeakMap()));
    do_not_optimize(lodash.isMap([]));
    do_not_optimize(lodash.isMap({}));
    do_not_optimize(lodash.isMap(null));
  });
});

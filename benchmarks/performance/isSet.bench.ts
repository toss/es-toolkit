import { isSet as isSetToolkit } from 'es-toolkit';
import { isSet as isSetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isSet', () => {
  bench('es-toolkit/isSet', () => {
    do_not_optimize(isSetToolkit(new Set()));
    do_not_optimize(isSetToolkit(new WeakSet()));
    do_not_optimize(isSetToolkit([]));
    do_not_optimize(isSetToolkit({}));
    do_not_optimize(isSetToolkit(null));
  });

  bench('es-toolkit/isSetCompat', () => {
    do_not_optimize(isSetToolkitCompat(new Set()));
    do_not_optimize(isSetToolkitCompat(new WeakSet()));
    do_not_optimize(isSetToolkitCompat([]));
    do_not_optimize(isSetToolkitCompat({}));
    do_not_optimize(isSetToolkitCompat(null));
  });

  bench('lodash/isSet', () => {
    do_not_optimize(lodash.isSet(new Set()));
    do_not_optimize(lodash.isSet(new WeakSet()));
    do_not_optimize(lodash.isSet([]));
    do_not_optimize(lodash.isSet({}));
    do_not_optimize(lodash.isSet(null));
  });
});

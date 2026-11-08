import { isArrayLikeObject as isArrayLikeObjectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isArrayLikeObject', () => {
  bench('es-toolkit/isArrayLikeObject', () => {
    do_not_optimize(isArrayLikeObjectToolkit(true));
    do_not_optimize(isArrayLikeObjectToolkit(new Date()));
    do_not_optimize(isArrayLikeObjectToolkit(new Error()));
    do_not_optimize(isArrayLikeObjectToolkit({ a: 1 }));
    do_not_optimize(isArrayLikeObjectToolkit(1));
    do_not_optimize(isArrayLikeObjectToolkit(/x/));
    do_not_optimize(isArrayLikeObjectToolkit(Array.from({ length: 10000 })));
    do_not_optimize(isArrayLikeObjectToolkit({ length: 1000 }));
  });
  bench('lodash/isArrayLikeObject', () => {
    do_not_optimize(lodash.isArrayLikeObject(true));
    do_not_optimize(lodash.isArrayLikeObject(new Date()));
    do_not_optimize(lodash.isArrayLikeObject(new Error()));
    do_not_optimize(lodash.isArrayLikeObject({ a: 1 }));
    do_not_optimize(lodash.isArrayLikeObject(1));
    do_not_optimize(lodash.isArrayLikeObject(/x/));
    do_not_optimize(lodash.isArrayLikeObject(Array.from({ length: 10000 })));
    do_not_optimize(lodash.isArrayLikeObject({ length: 1000 }));
  });
});

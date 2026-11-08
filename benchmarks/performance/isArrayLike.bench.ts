import { isArrayLike as isArrayLikeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isArrayLike', () => {
  bench('es-toolkit/isArrayLike', () => {
    do_not_optimize(isArrayLikeToolkit(true));
    do_not_optimize(isArrayLikeToolkit(new Date()));
    do_not_optimize(isArrayLikeToolkit(new Error()));
    do_not_optimize(isArrayLikeToolkit({ a: 1 }));
    do_not_optimize(isArrayLikeToolkit(1));
    do_not_optimize(isArrayLikeToolkit(/x/));
    do_not_optimize(isArrayLikeToolkit(Array.from({ length: 10000 })));
    do_not_optimize(isArrayLikeToolkit({ length: 1000 }));
  });
  bench('lodash/isArrayLike', () => {
    do_not_optimize(lodash.isArrayLike(true));
    do_not_optimize(lodash.isArrayLike(new Date()));
    do_not_optimize(lodash.isArrayLike(new Error()));
    do_not_optimize(lodash.isArrayLike({ a: 1 }));
    do_not_optimize(lodash.isArrayLike(1));
    do_not_optimize(lodash.isArrayLike(/x/));
    do_not_optimize(lodash.isArrayLike(Array.from({ length: 10000 })));
    do_not_optimize(lodash.isArrayLike({ length: 1000 }));
  });
});

import { isObjectLike as isObjectLikeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isObjectLike', () => {
  bench('es-toolkit/isObjectLike', () => {
    do_not_optimize(isObjectLikeToolkit([1, 2, 3]));
    do_not_optimize(isObjectLikeToolkit(true));
    do_not_optimize(isObjectLikeToolkit(new Date()));
    do_not_optimize(isObjectLikeToolkit(new Error()));
    do_not_optimize(isObjectLikeToolkit(1));
    do_not_optimize(isObjectLikeToolkit(/x/));
    do_not_optimize(isObjectLikeToolkit('a'));
  });

  bench('lodash/isObjectLike', () => {
    do_not_optimize(lodash.isObjectLike([1, 2, 3]));
    do_not_optimize(lodash.isObjectLike(true));
    do_not_optimize(lodash.isObjectLike(new Date()));
    do_not_optimize(lodash.isObjectLike(new Error()));
    do_not_optimize(lodash.isObjectLike(1));
    do_not_optimize(lodash.isObjectLike(/x/));
    do_not_optimize(lodash.isObjectLike('a'));
  });
});

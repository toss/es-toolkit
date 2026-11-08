import { isObjectLike as isObjectLikeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isObjectLike', () => {
  bench('es-toolkit/isObjectLike', () => {
    isObjectLikeToolkit([1, 2, 3]);
    isObjectLikeToolkit(true);
    isObjectLikeToolkit(new Date());
    isObjectLikeToolkit(new Error());
    isObjectLikeToolkit(1);
    isObjectLikeToolkit(/x/);
    isObjectLikeToolkit('a');
  });

  bench('lodash/isObjectLike', () => {
    lodash.isObjectLike([1, 2, 3]);
    lodash.isObjectLike(true);
    lodash.isObjectLike(new Date());
    lodash.isObjectLike(new Error());
    lodash.isObjectLike(1);
    lodash.isObjectLike(/x/);
    lodash.isObjectLike('a');
  });
});

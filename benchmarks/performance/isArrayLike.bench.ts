import { isArrayLike as isArrayLikeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isArrayLike', () => {
  bench('es-toolkit/isArrayLike', () => {
    isArrayLikeToolkit(true);
    isArrayLikeToolkit(new Date());
    isArrayLikeToolkit(new Error());
    isArrayLikeToolkit({ a: 1 });
    isArrayLikeToolkit(1);
    isArrayLikeToolkit(/x/);
    isArrayLikeToolkit(Array.from({ length: 10000 }));
    isArrayLikeToolkit({ length: 1000 });
  });
  bench('lodash/isArrayLike', () => {
    lodash.isArrayLike(true);
    lodash.isArrayLike(new Date());
    lodash.isArrayLike(new Error());
    lodash.isArrayLike({ a: 1 });
    lodash.isArrayLike(1);
    lodash.isArrayLike(/x/);
    lodash.isArrayLike(Array.from({ length: 10000 }));
    lodash.isArrayLike({ length: 1000 });
  });
});

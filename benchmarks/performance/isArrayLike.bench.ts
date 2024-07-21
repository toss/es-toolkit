import { bench, describe } from 'vitest';
import { isArrayLike as isArrayLikeToolkit } from 'es-toolkit';
import { isArrayLike as isArrayLikeLodash } from 'lodash';

describe('isArrayLike', () => {
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
    isArrayLikeLodash(true);
    isArrayLikeLodash(new Date());
    isArrayLikeLodash(new Error());
    isArrayLikeLodash({ a: 1 });
    isArrayLikeLodash(1);
    isArrayLikeLodash(/x/);
    isArrayLikeLodash(Array.from({ length: 10000 }));
    isArrayLikeLodash({ length: 1000 });
  });
});

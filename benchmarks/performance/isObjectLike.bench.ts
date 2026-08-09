import { bench, describe } from 'vitest';
import { isObjectLike as isObjectLikeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isObjectLike: isObjectLikeLodash } = lodash;

describe('isObjectLike', () => {
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
    isObjectLikeLodash([1, 2, 3]);
    isObjectLikeLodash(true);
    isObjectLikeLodash(new Date());
    isObjectLikeLodash(new Error());
    isObjectLikeLodash(1);
    isObjectLikeLodash(/x/);
    isObjectLikeLodash('a');
  });
});

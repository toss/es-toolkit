import { bench, describe } from 'vitest';
import { isArrayLikeObject as isArrayLikeObjectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isArrayLikeObject: isArrayLikeObjectLodash } = lodash;

describe('isArrayLikeObject', () => {
  bench('es-toolkit/isArrayLikeObject', () => {
    isArrayLikeObjectToolkit(true);
    isArrayLikeObjectToolkit(new Date());
    isArrayLikeObjectToolkit(new Error());
    isArrayLikeObjectToolkit({ a: 1 });
    isArrayLikeObjectToolkit(1);
    isArrayLikeObjectToolkit(/x/);
    isArrayLikeObjectToolkit(Array.from({ length: 10000 }));
    isArrayLikeObjectToolkit({ length: 1000 });
  });
  bench('lodash/isArrayLikeObject', () => {
    isArrayLikeObjectLodash(true);
    isArrayLikeObjectLodash(new Date());
    isArrayLikeObjectLodash(new Error());
    isArrayLikeObjectLodash({ a: 1 });
    isArrayLikeObjectLodash(1);
    isArrayLikeObjectLodash(/x/);
    isArrayLikeObjectLodash(Array.from({ length: 10000 }));
    isArrayLikeObjectLodash({ length: 1000 });
  });
});

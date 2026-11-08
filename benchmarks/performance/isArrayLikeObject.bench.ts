import { isArrayLikeObject as isArrayLikeObjectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isArrayLikeObject', () => {
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
    lodash.isArrayLikeObject(true);
    lodash.isArrayLikeObject(new Date());
    lodash.isArrayLikeObject(new Error());
    lodash.isArrayLikeObject({ a: 1 });
    lodash.isArrayLikeObject(1);
    lodash.isArrayLikeObject(/x/);
    lodash.isArrayLikeObject(Array.from({ length: 10000 }));
    lodash.isArrayLikeObject({ length: 1000 });
  });
});

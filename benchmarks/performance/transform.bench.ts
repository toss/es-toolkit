import { transform as transformToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const bigObject = Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [i, i]));
const bigArray = Array.from({ length: 1000 }, (_, i) => i);
const smallObject = { a: 1, b: 2, c: 3 };
const smallArray = [1, 2, 3];
const iteratee = (acc: any, value: number, key: any) => {
  acc[key] = value * value;
};

group('transform (small object)', () => {
  bench('es-toolkit/compat/transform', () => {
    do_not_optimize(transformToolkitCompat(smallObject, iteratee));
  });

  bench('lodash/transform', () => {
    do_not_optimize(lodash.transform(smallObject, iteratee));
  });
});

group('transform (big object)', () => {
  bench('es-toolkit/compat/transform', () => {
    do_not_optimize(transformToolkitCompat(bigObject, iteratee));
  });

  bench('lodash/transform', () => {
    do_not_optimize(lodash.transform(bigObject, iteratee));
  });
});

group('transform (big array)', () => {
  bench('es-toolkit/compat/transform', () => {
    do_not_optimize(transformToolkitCompat(bigArray, iteratee));
  });

  bench('lodash/transform', () => {
    do_not_optimize(lodash.transform(bigArray, iteratee));
  });
});

group('transform (small array)', () => {
  bench('es-toolkit/compat/transform', () => {
    do_not_optimize(transformToolkitCompat(smallArray, iteratee));
  });

  bench('lodash/transform', () => {
    do_not_optimize(lodash.transform(smallArray, iteratee));
  });
});

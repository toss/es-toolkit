import { bench, describe } from 'vitest';
import { transform as transformToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { transform: transformLodash } = lodash;

const bigObject = Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [i, i]));
const bigArray = Array.from({ length: 1000 }, (_, i) => i);
const smallObject = { a: 1, b: 2, c: 3 };
const smallArray = [1, 2, 3];
const iteratee = (acc: any, value: number, key: any) => {
  acc[key] = value * value;
};

describe('transform (small object)', () => {
  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(smallObject, iteratee);
  });

  bench('lodash/transform', () => {
    transformLodash(smallObject, iteratee);
  });
});

describe('transform (big object)', () => {
  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(bigObject, iteratee);
  });

  bench('lodash/transform', () => {
    transformLodash(bigObject, iteratee);
  });
});

describe('transform (big array)', () => {
  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(bigArray, iteratee);
  });

  bench('lodash/transform', () => {
    transformLodash(bigArray, iteratee);
  });
});

describe('transform (small array)', () => {
  bench('es-toolkit/compat/transform', () => {
    transformToolkitCompat(smallArray, iteratee);
  });

  bench('lodash/transform', () => {
    transformLodash(smallArray, iteratee);
  });
});

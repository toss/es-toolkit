import { bench, describe } from 'vitest';
import { last as lastToolkit_ } from 'es-toolkit';
import { last as lastToolkitCompat_ } from 'es-toolkit/compat';
import { last as lastLodash_ } from 'lodash';

const lastToolkit = lastToolkit_;
const lastToolkitCompat = lastToolkitCompat_;
const lastLodash = lastLodash_;

describe('last', () => {
  bench('es-toolkit/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    lastToolkit(people);
  });

  bench('es-toolkit/compat/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    lastToolkitCompat(people);
  });

  bench('lodash/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    lastLodash(people);
  });
});

describe('last/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/last', () => {
    lastToolkit(largeArray);
  });

  bench('es-toolkit/compat/last', () => {
    lastToolkitCompat(largeArray);
  });

  bench('lodash/last', () => {
    lastLodash(largeArray);
  });
});

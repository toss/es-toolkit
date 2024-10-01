import { bench, describe } from 'vitest';
import { last as lastToolkit_ } from 'es-toolkit';
import { last as lastLodash_ } from 'lodash';

const lastToolkit = lastToolkit_;
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

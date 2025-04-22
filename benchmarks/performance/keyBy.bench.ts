import { bench, describe } from 'vitest';
import { keyBy as keyByToolkit_ } from 'es-toolkit';
import { keyBy as keyByToolkitCompat_ } from 'es-toolkit/compat';
import { keyBy as keyByLodash_ } from 'lodash';

const keyByToolkit = keyByToolkit_;
const keyByToolkitCompat = keyByToolkitCompat_;
const keyByLodash = keyByLodash_;

describe('keyBy', () => {
  bench('es-toolkit/keyBy', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    keyByToolkit(people, person => person.name);
  });

  bench('es-toolkit/compat/keyBy', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    keyByToolkitCompat(people, person => person.name);
  });

  bench('lodash/keyBy', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    keyByLodash(people, person => person.name);
  });
});

describe('keyBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/keyBy', () => {
    keyByToolkit(largeArray, person => person.name);
  });

  bench('es-toolkit/compat/keyBy', () => {
    keyByToolkitCompat(largeArray, person => person.name);
  });

  bench('lodash/keyBy', () => {
    keyByLodash(largeArray, person => person.name);
  });
});

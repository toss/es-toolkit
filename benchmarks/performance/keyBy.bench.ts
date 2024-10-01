import { bench, describe } from 'vitest';
import { keyBy as keyByToolkit_ } from 'es-toolkit';
import { keyBy as keyByLodash_ } from 'lodash';

const keyByToolkit = keyByToolkit_;
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

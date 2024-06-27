import { bench, describe } from 'vitest';
import { maxBy as maxByToolkit } from 'es-toolkit';
import { maxBy as maxByLodash } from 'lodash';

describe('maxBy', () => {
  bench('es-toolkit/maxBy', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    maxByToolkit(people, person => person.age);
  });

  bench('lodash/maxBy', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    maxByLodash(people, person => person.age);
  });
});

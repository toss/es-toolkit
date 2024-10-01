import { bench, describe } from 'vitest';
import { maxBy as maxByToolkit_ } from 'es-toolkit';
import { maxBy as maxByLodash_ } from 'lodash';

const maxByToolkit = maxByToolkit_;
const maxByLodash = maxByLodash_;

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

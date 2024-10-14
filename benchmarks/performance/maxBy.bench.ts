import { maxBy as maxByToolkit } from 'es-toolkit';
import { maxBy as maxByLodash } from 'lodash';
import { bench, describe } from '../bench';

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

describe('maxBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/maxBy', () => {
    maxByToolkit(largeArray, person => person.age);
  });

  bench('lodash/maxBy', () => {
    maxByLodash(largeArray, person => person.age);
  });
});

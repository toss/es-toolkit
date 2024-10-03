import { bench, describe } from 'vitest';
import { minBy as minByToolkit_ } from 'es-toolkit';
import { minBy as minByLodash_ } from 'lodash';

const minByToolkit = minByToolkit_;
const minByLodash = minByLodash_;

describe('minBy', () => {
  bench('es-toolkit/minBy', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    minByToolkit(people, person => person.age);
  });

  bench('lodash/minBy', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    minByLodash(people, person => person.age);
  });
});

describe('minBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/minBy', () => {
    minByToolkit(largeArray, person => person.age);
  });

  bench('lodash/minBy', () => {
    minByLodash(largeArray, person => person.age);
  });
});

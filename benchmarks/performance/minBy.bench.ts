import { minBy as minByToolkit } from 'es-toolkit';
import { minBy as minByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('minBy', () => {
  bench('es-toolkit/minBy', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    minByToolkit(people, person => person.age);
  });

  bench('es-toolkit/compat/minBy', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    minByToolkitCompat(people, person => person.age);
  });

  bench('lodash/minBy', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    lodash.minBy(people, person => person.age);
  });
});

group('minBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/minBy', () => {
    minByToolkit(largeArray, person => person.age);
  });

  bench('es-toolkit/compat/minBy', () => {
    minByToolkitCompat(largeArray, person => person.age);
  });

  bench('lodash/minBy', () => {
    lodash.minBy(largeArray, person => person.age);
  });
});

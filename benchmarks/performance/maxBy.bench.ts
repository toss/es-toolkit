import { maxBy as maxByToolkit } from 'es-toolkit';
import { maxBy as maxByCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('maxBy', () => {
  bench('es-toolkit/maxBy', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    do_not_optimize(maxByToolkit(people, person => person.age));
  });

  bench('es-toolkit/compat/maxBy', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    do_not_optimize(maxByCompat(people, person => person.age));
  });

  bench('lodash/maxBy', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    do_not_optimize(lodash.maxBy(people, person => person.age));
  });
});

group('maxBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/maxBy', () => {
    do_not_optimize(maxByToolkit(largeArray, person => person.age));
  });

  bench('es-toolkit/compat/maxBy', () => {
    do_not_optimize(maxByCompat(largeArray, person => person.age));
  });

  bench('lodash/maxBy', () => {
    do_not_optimize(lodash.maxBy(largeArray, person => person.age));
  });
});

import { last as lastToolkit } from 'es-toolkit';
import { last as lastToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('last', () => {
  bench('es-toolkit/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    do_not_optimize(lastToolkit(people));
  });

  bench('es-toolkit/compat/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    do_not_optimize(lastToolkitCompat(people));
  });

  bench('lodash/last', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
      { name: 'john', age: 25 },
      { name: 'sarah', age: 25 },
      { name: 'emma', age: 25 },
    ];

    do_not_optimize(lodash.last(people));
  });
});

group('last/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/last', () => {
    do_not_optimize(lastToolkit(largeArray));
  });

  bench('es-toolkit/compat/last', () => {
    do_not_optimize(lastToolkitCompat(largeArray));
  });

  bench('lodash/last', () => {
    do_not_optimize(lodash.last(largeArray));
  });
});

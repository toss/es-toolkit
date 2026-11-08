import { keyBy as keyByToolkit } from 'es-toolkit';
import { keyBy as keyByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('keyBy', () => {
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

    lodash.keyBy(people, person => person.name);
  });
});

group('keyBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ name: `name${i}`, age: i }));

  bench('es-toolkit/keyBy', () => {
    keyByToolkit(largeArray, person => person.name);
  });

  bench('es-toolkit/compat/keyBy', () => {
    keyByToolkitCompat(largeArray, person => person.name);
  });

  bench('lodash/keyBy', () => {
    lodash.keyBy(largeArray, person => person.name);
  });
});

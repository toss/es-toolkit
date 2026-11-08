import { sortBy as sortByToolkit } from 'es-toolkit';
import { sortBy as sortByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const users = [
  { user: 'fred', age: 48, nested: { user: 'fred' } },
  { user: 'barney', age: 34, nested: { user: 'barney' } },
  { user: 'fred', age: 40, nested: { user: 'fred' } },
  { user: 'barney', age: 36, nested: { user: 'bar' } },
];

group('sortBy', () => {
  bench('es-toolkit/sortBy', () => {
    do_not_optimize(sortByToolkit(users, ['user', 'age']));
    do_not_optimize(sortByToolkit(users, [user => user.user, user => user.age]));
  });

  bench('es-toolkit/compat/sortBy', () => {
    do_not_optimize(sortByToolkitCompat(users, ['user', 'age']));
    do_not_optimize(sortByToolkitCompat(users, [user => user.user, user => user.age]));
  });

  bench('lodash/sortBy', () => {
    do_not_optimize(lodash.sortBy(users, ['user', 'age']));
    do_not_optimize(lodash.sortBy(users, [user => user.user, user => user.age]));
  });
});

group('sortBy (nested property names)', () => {
  bench('es-toolkit/compat/sortBy', () => {
    do_not_optimize(sortByToolkitCompat(users, [['nested', 'user'], ['age']]));
  });

  bench('lodash/sortBy', () => {
    do_not_optimize(lodash.sortBy(users, [['nested', 'user'], ['age']]));
  });
});

group('sortBy (property path)', () => {
  bench('es-toolkit/compat/sortBy', () => {
    do_not_optimize(sortByToolkitCompat(users, ['nested.user', 'age']));
  });
  bench('lodash/sortBy', () => {
    do_not_optimize(lodash.sortBy(users, ['nested.user', 'age']));
  });
});

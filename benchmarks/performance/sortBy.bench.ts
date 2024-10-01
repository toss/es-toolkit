import { bench, describe } from 'vitest';
import { sortBy as sortByToolkit_ } from 'es-toolkit';
import { sortBy as sortByToolkitCompat_ } from 'es-toolkit/compat';
import { sortBy as sortByLodash_ } from 'lodash';

const sortByToolkit = sortByToolkit_;
const sortByToolkitCompat = sortByToolkitCompat_;
const sortByLodash = sortByLodash_;

const users = [
  { user: 'fred', age: 48, nested: { user: 'fred' } },
  { user: 'barney', age: 34, nested: { user: 'barney' } },
  { user: 'fred', age: 40, nested: { user: 'fred' } },
  { user: 'barney', age: 36, nested: { user: 'bar' } },
];

describe('sortBy', () => {
  bench('es-toolkit/sortBy', () => {
    sortByToolkit(users, ['user', 'age']);
    sortByToolkit(users, [user => user.user, user => user.age]);
  });

  bench('es-toolkit/compat/sortBy', () => {
    sortByToolkitCompat(users, ['user', 'age']);
    sortByToolkitCompat(users, [user => user.user, user => user.age]);
  });

  bench('lodash/sortBy', () => {
    sortByLodash(users, ['user', 'age']);
    sortByLodash(users, [user => user.user, user => user.age]);
  });
});

describe('sortBy (nested property names)', () => {
  bench('es-toolkit/compat/sortBy', () => {
    sortByToolkitCompat(users, [['nested', 'user'], ['age']]);
  });

  bench('lodash/sortBy', () => {
    sortByLodash(users, [['nested', 'user'], ['age']]);
  });
});

describe('sortBy (property path)', () => {
  bench('es-toolkit/compat/sortBy', () => {
    sortByToolkitCompat(users, ['nested.user', 'age']);
  });
  bench('lodash/sortBy', () => {
    sortByLodash(users, ['nested.user', 'age']);
  });
});

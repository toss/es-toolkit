import { bench, describe } from 'vitest';
import { orderBy as orderByToolkit } from 'es-toolkit';
import { orderBy as orderByToolkitCompat } from 'es-toolkit/compat';
import { orderBy as orderByLodash } from 'lodash';

const users = [
  { user: 'fred', age: 48, nested: { user: 'fred' } },
  { user: 'barney', age: 34, nested: { user: 'barney' } },
  { user: 'fred', age: 40, nested: { user: 'fred' } },
  { user: 'barney', age: 36, nested: { user: 'bar' } },
];

describe('orderBy', () => {
  bench('es-toolkit/orderBy', () => {
    orderByToolkit(users, ['user', 'age'], ['asc', 'desc']);
    orderByToolkit(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });

  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, ['user', 'age'], ['asc', 'desc']);
    orderByToolkitCompat(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });

  bench('lodash/orderBy', () => {
    orderByLodash(users, ['user', 'age'], ['asc', 'desc']);
    orderByLodash(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });
});

describe('orderBy (nested property names)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, [['nested', 'user'], ['age']], ['asc', 'desc']);
  });

  bench('lodash/orderBy', () => {
    orderByLodash(users, [['nested', 'user'], ['age']], ['asc', 'desc']);
  });
});

describe('orderBy (property path)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, ['nested.user', 'age'], ['asc', 'desc']);
  });
  bench('lodash/orderBy', () => {
    orderByLodash(users, ['nested.user', 'age'], ['asc', 'desc']);
  });
});

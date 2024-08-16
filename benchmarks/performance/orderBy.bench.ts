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
const keys: Array<keyof (typeof users)[0]> = ['user', 'age'];
const orders: Array<'asc' | 'desc'> = ['asc', 'desc'];

describe('orderBy', () => {
  bench('es-toolkit/orderBy', () => {
    orderByToolkit(users, keys, orders);
  });

  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, keys, orders);
  });

  bench('lodash/orderBy', () => {
    orderByLodash(users, keys, orders);
  });
});

describe('orderBy (nested property names)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, [['nested', 'user'], ['age']], orders);
  });

  bench('lodash/orderBy', () => {
    orderByLodash(users, [['nested', 'user'], ['age']], orders);
  });
});

describe('orderBy (property path)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, ['nested.user', 'age'], orders);
  });
  bench('lodash/orderBy', () => {
    orderByLodash(users, ['nested.user', 'age'], orders);
  });
});

describe('orderBy (custom key function)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, [item => item.user, item => item.age], orders);
  });

  bench('lodash/orderBy', () => {
    orderByLodash(users, [item => item.user, item => item.age], orders);
  });
});

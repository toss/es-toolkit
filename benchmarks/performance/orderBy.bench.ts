import { orderBy as orderByToolkit } from 'es-toolkit';
import { orderBy as orderByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const users = [
  { user: 'fred', age: 48, nested: { user: 'fred' } },
  { user: 'barney', age: 34, nested: { user: 'barney' } },
  { user: 'fred', age: 40, nested: { user: 'fred' } },
  { user: 'barney', age: 36, nested: { user: 'bar' } },
];

group('orderBy', () => {
  bench('es-toolkit/orderBy', () => {
    orderByToolkit(users, ['user', 'age'], ['asc', 'desc']);
    orderByToolkit(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });

  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, ['user', 'age'], ['asc', 'desc']);
    orderByToolkitCompat(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });

  bench('lodash/orderBy', () => {
    lodash.orderBy(users, ['user', 'age'], ['asc', 'desc']);
    lodash.orderBy(users, [user => user.user, user => user.age], ['asc', 'desc']);
  });
});

group('orderBy (nested property names)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, [['nested', 'user'], ['age']], ['asc', 'desc']);
  });

  bench('lodash/orderBy', () => {
    lodash.orderBy(users, [['nested', 'user'], ['age']], ['asc', 'desc']);
  });
});

group('orderBy (property path)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    orderByToolkitCompat(users, ['nested.user', 'age'], ['asc', 'desc']);
  });
  bench('lodash/orderBy', () => {
    lodash.orderBy(users, ['nested.user', 'age'], ['asc', 'desc']);
  });
});

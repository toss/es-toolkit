import { orderBy as orderByToolkit } from 'es-toolkit';
import { orderBy as orderByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const users = [
  { user: 'fred', age: 48, nested: { user: 'fred' } },
  { user: 'barney', age: 34, nested: { user: 'barney' } },
  { user: 'fred', age: 40, nested: { user: 'fred' } },
  { user: 'barney', age: 36, nested: { user: 'bar' } },
];

group('orderBy', () => {
  bench('es-toolkit/orderBy', () => {
    do_not_optimize(orderByToolkit(users, ['user', 'age'], ['asc', 'desc']));
    do_not_optimize(orderByToolkit(users, [user => user.user, user => user.age], ['asc', 'desc']));
  });

  bench('es-toolkit/compat/orderBy', () => {
    do_not_optimize(orderByToolkitCompat(users, ['user', 'age'], ['asc', 'desc']));
    do_not_optimize(orderByToolkitCompat(users, [user => user.user, user => user.age], ['asc', 'desc']));
  });

  bench('lodash/orderBy', () => {
    do_not_optimize(lodash.orderBy(users, ['user', 'age'], ['asc', 'desc']));
    do_not_optimize(lodash.orderBy(users, [user => user.user, user => user.age], ['asc', 'desc']));
  });
});

group('orderBy (nested property names)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    do_not_optimize(orderByToolkitCompat(users, [['nested', 'user'], ['age']], ['asc', 'desc']));
  });

  bench('lodash/orderBy', () => {
    do_not_optimize(lodash.orderBy(users, [['nested', 'user'], ['age']], ['asc', 'desc']));
  });
});

group('orderBy (property path)', () => {
  bench('es-toolkit/compat/orderBy', () => {
    do_not_optimize(orderByToolkitCompat(users, ['nested.user', 'age'], ['asc', 'desc']));
  });
  bench('lodash/orderBy', () => {
    do_not_optimize(lodash.orderBy(users, ['nested.user', 'age'], ['asc', 'desc']));
  });
});

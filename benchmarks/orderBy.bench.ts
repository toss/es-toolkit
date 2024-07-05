import { bench, describe } from 'vitest';
import { orderBy as orderByToolkit } from 'es-toolkit';
import { orderBy as orderByLodash } from 'lodash';

describe('orderBy', () => {
  bench('es-toolkit/orderBy', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];
    orderByToolkit(users, ['user', 'age'], ['asc', 'asc']);
  });

  bench('lodash/orderBy', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];
    orderByLodash(users, ['user', 'age'], ['asc', 'asc']);
  });
});

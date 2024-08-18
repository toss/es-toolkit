import { bench, describe } from 'vitest';
import { sortBy as sortByToolkit } from 'es-toolkit';
import { sortBy as sortByLodash } from 'lodash';

describe('sortBy', () => {
  const users = [
    { user: 'fred', age: 48, nested: { user: 'fred' } },
    { user: 'barney', age: 34, nested: { user: 'barney' } },
    { user: 'fred', age: 40, nested: { user: 'fred' } },
    { user: 'barney', age: 36, nested: { user: 'bar' } },
  ];
  const keys: Array<keyof (typeof users)[0]> = ['user', 'age'];

  bench('es-toolkit/sortBy', () => {
    sortByToolkit(users, keys);
    sortByToolkit(users, [user => user.user, user => user.age]);
  });
  bench('lodash/sortBy', () => {
    sortByLodash(users, keys);
    sortByLodash(users, [user => user.user, user => user.age]);
  });
});

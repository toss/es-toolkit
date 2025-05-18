import { bench, describe } from 'vitest';
import { findLastKey as findLastKeyCompatToolkit } from 'es-toolkit/compat';
import { findLastKey as findLastKeyLodash } from 'lodash';

describe('findLastKey', () => {
  const users = {
    pebbles: { age: 24, active: true },
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
  };

  bench('lodash/findLastKey', () => {
    findLastKeyLodash(users, o => o.age < 40);
  });

  bench('es-toolkit/compat/findLastKey', () => {
    findLastKeyCompatToolkit(users, o => o.age < 40);
  });
});

describe('findLastKey/largeObject', () => {
  const largeUsers: Record<string, { age: number }> = {};
  for (let i = 0; i < 10000; i++) {
    largeUsers[`user${i}`] = { age: Number(i) };
  }

  bench('lodash/findLastKey', () => {
    findLastKeyLodash(largeUsers, o => o.age === 7000);
  });

  bench('es-toolkit/compat/findLastKey', () => {
    findLastKeyCompatToolkit(largeUsers, o => o.age === 7000);
  });
});

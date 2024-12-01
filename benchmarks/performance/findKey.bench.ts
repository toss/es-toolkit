import { bench, describe } from 'vitest';
import { findKey as findKeyToolkit } from 'es-toolkit';
import { findKey as findKeyCompatToolkit } from 'es-toolkit/compat';
import { findKey as findKeyLodash } from 'lodash';

describe('findKey', () => {
  const users = {
    pebbles: { age: 24, active: true },
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
  };

  bench('es-toolkit/findKey', () => {
    findKeyToolkit(users, o => o.age < 40);
  });

  bench('lodash/findKey', () => {
    findKeyLodash(users, o => o.age < 40);
  });

  bench('es-toolkit/compat/findKey', () => {
    findKeyCompatToolkit(users, o => o.age < 40);
  });
});

describe('findKey/largeObject', () => {
  const largeUsers: Record<string, { age: number }> = {};
  for (let i = 0; i < 10000; i++) {
    largeUsers[`user${i}`] = { age: Number(i) };
  }

  bench('es-toolkit/findKey', () => {
    findKeyToolkit(largeUsers, o => o.age === 7000);
  });

  bench('lodash/findKey', () => {
    findKeyLodash(largeUsers, o => o.age === 7000);
  });

  bench('es-toolkit/compat/findKey', () => {
    findKeyCompatToolkit(largeUsers, o => o.age === 7000);
  });
});

import { findLastKey as findLastKeyCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('findLastKey', () => {
  const users = {
    pebbles: { age: 24, active: true },
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
  };

  bench('lodash/findLastKey', () => {
    lodash.findLastKey(users, o => o.age < 40);
  });

  bench('es-toolkit/compat/findLastKey', () => {
    findLastKeyCompatToolkit(users, o => o.age < 40);
  });
});

group('findLastKey/largeObject', () => {
  const largeUsers: Record<string, { age: number }> = {};
  for (let i = 0; i < 10000; i++) {
    largeUsers[`user${i}`] = { age: Number(i) };
  }

  bench('lodash/findLastKey', () => {
    lodash.findLastKey(largeUsers, o => o.age === 7000);
  });

  bench('es-toolkit/compat/findLastKey', () => {
    findLastKeyCompatToolkit(largeUsers, o => o.age === 7000);
  });
});

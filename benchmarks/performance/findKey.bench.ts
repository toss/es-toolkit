import { findKey as findKeyToolkit } from 'es-toolkit';
import { findKey as findKeyCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('findKey', () => {
  const users = {
    pebbles: { age: 24, active: true },
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
  };

  bench('es-toolkit/findKey', () => {
    do_not_optimize(findKeyToolkit(users, o => o.age < 40));
  });

  bench('lodash/findKey', () => {
    do_not_optimize(lodash.findKey(users, o => o.age < 40));
  });

  bench('es-toolkit/compat/findKey', () => {
    do_not_optimize(findKeyCompatToolkit(users, o => o.age < 40));
  });
});

group('findKey/largeObject', () => {
  const largeUsers: Record<string, { age: number }> = {};
  for (let i = 0; i < 10000; i++) {
    largeUsers[`user${i}`] = { age: Number(i) };
  }

  bench('es-toolkit/findKey', () => {
    do_not_optimize(findKeyToolkit(largeUsers, o => o.age === 7000));
  });

  bench('lodash/findKey', () => {
    do_not_optimize(lodash.findKey(largeUsers, o => o.age === 7000));
  });

  bench('es-toolkit/compat/findKey', () => {
    do_not_optimize(findKeyCompatToolkit(largeUsers, o => o.age === 7000));
  });
});

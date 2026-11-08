import { isMatchWith as isMatchWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const customizer = (objValue: unknown, srcValue: unknown) => {
  if (typeof objValue === 'string' && typeof srcValue === 'string') {
    return objValue.toLowerCase() === srcValue.toLowerCase();
  }
};

group('isMatchWith', () => {
  bench('es-toolkit/compat/isMatchWith', () => {
    isMatchWithToolkitCompat({ a: 'A' }, { a: 'a' }, customizer);
  });

  bench('lodash/isMatchWith', () => {
    lodash.isMatchWith({ a: 'A' }, { a: 'a' }, customizer);
  });
});

group('isMatchWith - complex objects', () => {
  const targetObject = {
    user: {
      name: 'Minsu',
      age: 25,
      email: 'minsu@example.com',
      address: {
        city: 'Seoul',
        country: 'Korea',
      },
      hobbies: ['Reading', 'Gaming', 'Coding', 'Traveling'],
    },
  };

  const sourceObject = {
    user: {
      name: 'Minsu',
      email: 'minsu@example.com',
      address: {
        city: 'Seoul',
        country: 'Korea',
      },
    },
  };

  bench('es-toolkit/compat/isMatchWith', () => {
    isMatchWithToolkitCompat(targetObject, sourceObject, customizer);
  });

  bench('lodash/isMatchWith', () => {
    lodash.isMatchWith(targetObject, sourceObject, customizer);
  });
});

group('isMatchWith - arrays', () => {
  const targetArray = [
    { id: 1, name: 'ITEM 1' },
    { id: 2, name: 'ITEM 2' },
    { id: 3, name: 'ITEM 3' },
  ];

  const sourceArray = [
    { id: 1, name: 'item 1' },
    { id: 3, name: 'item 3' },
  ];

  bench('es-toolkit/compat/isMatchWith', () => {
    isMatchWithToolkitCompat(targetArray, sourceArray, customizer);
  });

  bench('lodash/isMatchWith', () => {
    lodash.isMatchWith(targetArray, sourceArray, customizer);
  });
});

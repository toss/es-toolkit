import { bench, describe } from 'vitest';
import { zipObject as zipObjectToolkit } from 'es-toolkit';
import { zipObject as zipObjectToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { zipObject: zipObjectLodash } = lodash;

describe('zipObject', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('es-toolkit/compat/zipObject', () => {
    zipObjectToolkitCompat([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('lodash/zipObject', () => {
    zipObjectLodash([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });
});

describe('zipObject/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit(largeArray, largeArray);
  });

  bench('es-toolkit/compat/zipObject', () => {
    zipObjectToolkitCompat(largeArray, largeArray);
  });

  bench('lodash/zipObject', () => {
    zipObjectLodash(largeArray, largeArray);
  });
});

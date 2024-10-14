import { zipObject as zipObjectToolkit } from 'es-toolkit';
import { zipObject as zipObjectLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('zipObject', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
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

  bench('lodash/zipObject', () => {
    zipObjectLodash(largeArray, largeArray);
  });
});

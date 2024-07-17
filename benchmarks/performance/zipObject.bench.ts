import { bench, describe } from 'vitest';
import { zipObject as zipObjectToolkit } from 'es-toolkit';
import { zipObject as zipObjectLodash } from 'lodash';

describe('zipObject', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('lodash/zipObject', () => {
    zipObjectLodash([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });
});

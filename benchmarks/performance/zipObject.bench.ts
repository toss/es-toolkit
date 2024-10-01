import { bench, describe } from 'vitest';
import { zipObject as zipObjectToolkit_ } from 'es-toolkit';
import { zipObject as zipObjectLodash_ } from 'lodash';

const zipObjectToolkit = zipObjectToolkit_;
const zipObjectLodash = zipObjectLodash_;

describe('zipObject', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('lodash/zipObject', () => {
    zipObjectLodash([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });
});

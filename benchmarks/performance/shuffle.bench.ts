import { bench, describe } from 'vitest';
import { shuffle as shuffleToolkit_ } from 'es-toolkit';
import { shuffle as shuffleLodash_ } from 'lodash';

const shuffleToolkit = shuffleToolkit_;
const shuffleLodash = shuffleLodash_;

describe('shuffle', () => {
  bench('es-toolkit/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleToolkit(array);
  });

  bench('lodash/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleLodash(array);
  });
});

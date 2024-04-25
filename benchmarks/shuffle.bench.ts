import { bench, describe } from 'vitest';
import { shuffle as shuffleToolkit } from 'es-toolkit';
import { shuffle as shuffleLodash } from 'lodash';

describe('shuffle', () => {
  bench('es-toolkit', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleToolkit(array);
  })

  bench('lodash', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleLodash(array);
  })
});
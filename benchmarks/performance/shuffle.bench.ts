import { shuffle as shuffleToolkit } from 'es-toolkit';
import { shuffle as shuffleLodash } from 'lodash';
import { bench, describe } from '../bench';

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

describe('shuffle/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/shuffle', () => {
    shuffleToolkit(largeArray);
  });

  bench('lodash/shuffle', () => {
    shuffleLodash(largeArray);
  });
});

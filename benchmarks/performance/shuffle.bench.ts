import { shuffle as shuffleToolkit } from 'es-toolkit';
import { shuffle as shuffleToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('shuffle', () => {
  bench('es-toolkit/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleToolkit(array);
  });

  bench('es-toolkit/compat/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    shuffleToolkitCompat(array);
  });

  bench('lodash/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    lodash.shuffle(array);
  });
});

group('shuffle/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/shuffle', () => {
    shuffleToolkit(largeArray);
  });

  bench('es-toolkit/compat/shuffle', () => {
    shuffleToolkitCompat(largeArray);
  });

  bench('lodash/shuffle', () => {
    lodash.shuffle(largeArray);
  });
});

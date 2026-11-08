import { shuffle as shuffleToolkit } from 'es-toolkit';
import { shuffle as shuffleToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('shuffle', () => {
  bench('es-toolkit/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(shuffleToolkit(array));
  });

  bench('es-toolkit/compat/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(shuffleToolkitCompat(array));
  });

  bench('lodash/shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(lodash.shuffle(array));
  });
});

group('shuffle/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/shuffle', () => {
    do_not_optimize(shuffleToolkit(largeArray));
  });

  bench('es-toolkit/compat/shuffle', () => {
    do_not_optimize(shuffleToolkitCompat(largeArray));
  });

  bench('lodash/shuffle', () => {
    do_not_optimize(lodash.shuffle(largeArray));
  });
});

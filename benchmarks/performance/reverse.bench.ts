import { reverse as reverseCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const testArray = Array.from({ length: 1000 }, (_, i) => i);

group('Reverse function performance tests', () => {
  bench('es-toolkit compat reverse', () => {
    const arrayCopy = [...testArray];
    do_not_optimize(reverseCompat(arrayCopy));
  });

  bench('lodash reverse', () => {
    const arrayCopy = [...testArray];
    do_not_optimize(lodash.reverse(arrayCopy));
  });
});

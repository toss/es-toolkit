import { reverse as reverseCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const testArray = Array.from({ length: 1000 }, (_, i) => i);

group('Reverse function performance tests', () => {
  bench('es-toolkit compat reverse', () => {
    const arrayCopy = [...testArray];
    reverseCompat(arrayCopy);
  });

  bench('lodash reverse', () => {
    const arrayCopy = [...testArray];
    lodash.reverse(arrayCopy);
  });
});

import { bench, describe } from 'vitest';
import { reverse as reverseCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { reverse: reverseLodash } = lodash;

const testArray = Array.from({ length: 1000 }, (_, i) => i);

describe('Reverse function performance tests', () => {
  bench('es-toolkit compat reverse', () => {
    const arrayCopy = [...testArray];
    reverseCompat(arrayCopy);
  });

  bench('lodash reverse', () => {
    const arrayCopy = [...testArray];
    reverseLodash(arrayCopy);
  });
});

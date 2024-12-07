import { bench, describe } from 'vitest';
import { reverse as reverseCompat_ } from 'es-toolkit/compat';
import { reverse as reverseLodash_ } from 'lodash';

const reverseCompat = reverseCompat_;
const reverseLodash = reverseLodash_;

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

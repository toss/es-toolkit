import { bench, describe } from 'vitest';
import { reverse as reverseToolkit_ } from 'es-toolkit';
import { reverse as reverseCompat_ } from 'es-toolkit/compat';
import { reverse as reverseLodash_ } from 'lodash';

const testArray = Array.from({ length: 1000 }, (_, i) => i);

describe('Reverse function performance tests', () => {
  bench('es-toolkit reverse', () => {
    const arrayCopy = [...testArray];
    reverseToolkit_(arrayCopy);
  });

  bench('es-toolkit compat reverse', () => {
    const arrayCopy = [...testArray];
    reverseCompat_(arrayCopy);
  });

  bench('lodash reverse', () => {
    const arrayCopy = [...testArray];
    reverseLodash_(arrayCopy);
  });
});

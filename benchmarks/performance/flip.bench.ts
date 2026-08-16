import { bench, describe } from 'vitest';
import { flip as flipToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { flip: flipLodash } = lodash;

describe('flip', () => {
  function fn(a: any, b: any, c: any, d: any) {
    return [a, b, c, d];
  }

  bench('es-toolkit/flip', () => {
    flipToolkit(fn);
  });

  bench('lodash/flip', () => {
    flipLodash(fn);
  });
});

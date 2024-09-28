import { bench, describe } from 'vitest';
import { flip as flipToolkit } from 'es-toolkit/compat';
import { flip as flipLodash } from 'lodash';

describe('flip', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

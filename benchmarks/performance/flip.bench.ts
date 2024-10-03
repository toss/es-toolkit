import { bench, describe } from 'vitest';
import { flip as flipToolkit_ } from 'es-toolkit/compat';
import { flip as flipLodash_ } from 'lodash';

const flipToolkit = flipToolkit_;
const flipLodash = flipLodash_;

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

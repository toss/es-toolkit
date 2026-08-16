import { bench, describe } from 'vitest';
import { method as methodToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { method: methodLodash } = lodash;

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

describe('method', () => {
  bench('es-toolkit/compat', () => {
    methodToolkit('a.b', 1, 2)(object);
  });

  bench('lodash', () => {
    methodLodash('a.b', 1, 2)(object);
  });
});

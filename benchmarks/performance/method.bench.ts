import { bench, describe } from 'vitest';
import { method as methodToolkit_ } from 'es-toolkit/compat';
import { method as methodLodash_ } from 'lodash';

const methodToolkit = methodToolkit_;
const methodLodash = methodLodash_;

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

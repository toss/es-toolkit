import { bench, describe } from 'vitest';
import { methodOf as methodOfToolkit_ } from 'es-toolkit/compat';
import { methodOf as methodOfLodash_ } from 'lodash';

const methodOfToolkit = methodOfToolkit_;
const methodOfLodash = methodOfLodash_;

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

describe('methodOf', () => {
  bench('es-toolkit/compat', () => {
    methodOfToolkit(object, 1, 2)('a.b');
  });

  bench('lodash', () => {
    methodOfLodash(object, 1, 2)('a.b');
  });
});

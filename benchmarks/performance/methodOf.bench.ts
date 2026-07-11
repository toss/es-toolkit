import { bench, describe } from 'vitest';
import { methodOf as methodOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { methodOf: methodOfLodash } = lodash;

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

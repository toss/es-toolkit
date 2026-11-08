import { methodOf as methodOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

group('methodOf', () => {
  bench('es-toolkit/compat', () => {
    methodOfToolkit(object, 1, 2)('a.b');
  });

  bench('lodash', () => {
    lodash.methodOf(object, 1, 2)('a.b');
  });
});

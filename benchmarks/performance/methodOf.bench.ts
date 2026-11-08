import { methodOf as methodOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

group('methodOf', () => {
  bench('es-toolkit/compat', () => {
    do_not_optimize(methodOfToolkit(object, 1, 2)('a.b'));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.methodOf(object, 1, 2)('a.b'));
  });
});

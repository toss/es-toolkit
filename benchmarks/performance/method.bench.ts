import { method as methodToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

group('method', () => {
  bench('es-toolkit/compat', () => {
    do_not_optimize(methodToolkit('a.b', 1, 2)(object));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.method('a.b', 1, 2)(object));
  });
});

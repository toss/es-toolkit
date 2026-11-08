import { method as methodToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = {
  a: {
    b: function (x: number, y: number) {
      return x + y;
    },
  },
};

group('method', () => {
  bench('es-toolkit/compat', () => {
    methodToolkit('a.b', 1, 2)(object);
  });

  bench('lodash', () => {
    lodash.method('a.b', 1, 2)(object);
  });
});

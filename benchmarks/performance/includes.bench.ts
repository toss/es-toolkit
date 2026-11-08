import { includes as includesToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('includes (object)', () => {
  const object = {
    a: 1,
    b: 'a',
    c: NaN,
    d: undefined,
    e: null,
    f: Infinity,
    g: -0,
  };

  bench('es-toolkit/includes', () => {
    includesToolkitCompat(object, 1);
    includesToolkitCompat(object, 'a');
    includesToolkitCompat(object, NaN);
    includesToolkitCompat(object, undefined);
    includesToolkitCompat(object, null);
    includesToolkitCompat(object, Infinity);
    includesToolkitCompat(object, -0);
    includesToolkitCompat(object, 1, -1);
  });

  bench('lodash/includes', () => {
    lodash.includes(object, 1);
    lodash.includes(object, 'a');
    lodash.includes(object, NaN);
    lodash.includes(object, undefined);
    lodash.includes(object, null);
    lodash.includes(object, Infinity);
    lodash.includes(object, -0);
    lodash.includes(object, 1, -1);
  });
});

group('includes (array)', () => {
  const array = [1, 'a', NaN, undefined, null, Infinity, Symbol('sym1'), -0];

  bench('es-toolkit/includes', () => {
    includesToolkitCompat(array, 1);
    includesToolkitCompat(array, 'a');
    includesToolkitCompat(array, NaN);
    includesToolkitCompat(array, undefined);
    includesToolkitCompat(array, null);
    includesToolkitCompat(array, Infinity);
    includesToolkitCompat(array, Symbol('sym1'));
    includesToolkitCompat(array, -0);
    includesToolkitCompat(array, 0, -1);
  });

  bench('lodash/includes', () => {
    lodash.includes(array, 1);
    lodash.includes(array, 'a');
    lodash.includes(array, NaN);
    lodash.includes(array, undefined);
    lodash.includes(array, null);
    lodash.includes(array, Infinity);
    lodash.includes(array, Symbol('sym1'));
    lodash.includes(array, -0);
    lodash.includes(array, 0, -1);
  });
});

group('includes (string)', () => {
  const string = 'abcdefg';

  bench('es-toolkit/compat/includes', () => {
    includesToolkitCompat(string, 'bc');
    includesToolkitCompat(string, 'd');
  });

  bench('lodash/includes', () => {
    lodash.includes(string, 'bc');
    lodash.includes(string, 'd');
  });
});

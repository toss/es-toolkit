import { includes as includesToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

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
    do_not_optimize(includesToolkitCompat(object, 1));
    do_not_optimize(includesToolkitCompat(object, 'a'));
    do_not_optimize(includesToolkitCompat(object, NaN));
    do_not_optimize(includesToolkitCompat(object, undefined));
    do_not_optimize(includesToolkitCompat(object, null));
    do_not_optimize(includesToolkitCompat(object, Infinity));
    do_not_optimize(includesToolkitCompat(object, -0));
    do_not_optimize(includesToolkitCompat(object, 1, -1));
  });

  bench('lodash/includes', () => {
    do_not_optimize(lodash.includes(object, 1));
    do_not_optimize(lodash.includes(object, 'a'));
    do_not_optimize(lodash.includes(object, NaN));
    do_not_optimize(lodash.includes(object, undefined));
    do_not_optimize(lodash.includes(object, null));
    do_not_optimize(lodash.includes(object, Infinity));
    do_not_optimize(lodash.includes(object, -0));
    do_not_optimize(lodash.includes(object, 1, -1));
  });
});

group('includes (array)', () => {
  const array = [1, 'a', NaN, undefined, null, Infinity, Symbol('sym1'), -0];

  bench('es-toolkit/includes', () => {
    do_not_optimize(includesToolkitCompat(array, 1));
    do_not_optimize(includesToolkitCompat(array, 'a'));
    do_not_optimize(includesToolkitCompat(array, NaN));
    do_not_optimize(includesToolkitCompat(array, undefined));
    do_not_optimize(includesToolkitCompat(array, null));
    do_not_optimize(includesToolkitCompat(array, Infinity));
    do_not_optimize(includesToolkitCompat(array, Symbol('sym1')));
    do_not_optimize(includesToolkitCompat(array, -0));
    do_not_optimize(includesToolkitCompat(array, 0, -1));
  });

  bench('lodash/includes', () => {
    do_not_optimize(lodash.includes(array, 1));
    do_not_optimize(lodash.includes(array, 'a'));
    do_not_optimize(lodash.includes(array, NaN));
    do_not_optimize(lodash.includes(array, undefined));
    do_not_optimize(lodash.includes(array, null));
    do_not_optimize(lodash.includes(array, Infinity));
    do_not_optimize(lodash.includes(array, Symbol('sym1')));
    do_not_optimize(lodash.includes(array, -0));
    do_not_optimize(lodash.includes(array, 0, -1));
  });
});

group('includes (string)', () => {
  const string = 'abcdefg';

  bench('es-toolkit/compat/includes', () => {
    do_not_optimize(includesToolkitCompat(string, 'bc'));
    do_not_optimize(includesToolkitCompat(string, 'd'));
  });

  bench('lodash/includes', () => {
    do_not_optimize(lodash.includes(string, 'bc'));
    do_not_optimize(lodash.includes(string, 'd'));
  });
});

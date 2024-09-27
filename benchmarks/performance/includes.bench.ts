import { bench, describe } from 'vitest';
import { includes as includesToolkitCompat } from 'es-toolkit/compat';
import { includes as includesLodash } from 'lodash';

describe('includes (object)', () => {
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
    includesToolkitCompat(object, Symbol('sym1'));
    includesToolkitCompat(object, -0);
    includesToolkitCompat(object, 1, -1);
  });

  bench('lodash/includes', () => {
    includesLodash(object, 1);
    includesLodash(object, 'a');
    includesLodash(object, NaN);
    includesLodash(object, undefined);
    includesLodash(object, null);
    includesLodash(object, Infinity);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    includesLodash(object, Symbol('sym1'));
    includesLodash(object, -0);
    includesLodash(object, 1, -1);
  });
});

describe('includes (array)', () => {
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
    includesLodash(array, 1);
    includesLodash(array, 'a');
    includesLodash(array, NaN);
    includesLodash(array, undefined);
    includesLodash(array, null);
    includesLodash(array, Infinity);
    includesLodash(array, Symbol('sym1'));
    includesLodash(array, -0);
    includesLodash(array, 0, -1);
  });
});

describe('includes (string)', () => {
  const string = 'abcdefg';

  bench('es-toolkit/compat/includes', () => {
    includesToolkitCompat(string, 'bc');
    includesToolkitCompat(string, 'd');
  });

  bench('lodash/includes', () => {
    includesLodash(string, 'bc');
    includesLodash(string, 'd');
  });
});

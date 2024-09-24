import { bench, describe } from 'vitest';
import { includes as includesToolkit } from 'es-toolkit';
import { includes as includesLodash } from 'lodash';

describe('includes', () => {
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
    includesToolkit(object, 1);
    includesToolkit(object, 'a');
    includesToolkit(object, NaN);
    includesToolkit(object, undefined);
    includesToolkit(object, null);
    includesToolkit(object, Infinity);
    includesToolkit(object, Symbol('sym1'));
    includesToolkit(object, -0);
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
  });
});

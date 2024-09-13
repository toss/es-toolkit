import { bench, describe } from 'vitest';
import { bind as bindToolkit } from 'es-toolkit/compat';
import { bind as bindLodash } from 'lodash';

function fn(this: any) {
  const result = [this];
  // eslint-disable-next-line prefer-rest-params
  return result.concat(Array.from(arguments));
}

describe('bind', () => {
  bench('es-toolkit/bind - without placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a');
  });

  bench('lodash/bind - without placeholder', () => {
    const object = {};
    bindLodash(fn, object, 'a');
  });

  bench('es-toolkit/bind - with placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a', bindToolkit.placeholder);
  });

  bench('lodash/bind - with placeholder', () => {
    const object = {};
    bindLodash(fn, object, 'a', bindLodash.placeholder);
  });
});

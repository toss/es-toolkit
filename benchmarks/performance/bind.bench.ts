import { bench, describe } from 'vitest';
import { bind as bindToolkit_ } from 'es-toolkit/compat';
import { bind as bindLodash_ } from 'lodash';

const bindToolkit = bindToolkit_;
const bindLodash = bindLodash_;

function fn(this: any) {
  const result = [this];
  // eslint-disable-next-line prefer-rest-params
  return result.concat(Array.from(arguments));
}

describe('bind - without placeholder', () => {
  bench('es-toolkit/bind - without placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a');
  });

  bench('lodash/bind - without placeholder', () => {
    const object = {};
    bindLodash(fn, object, 'a');
  });
});

describe('bind - with placeholder', () => {
  bench('es-toolkit/bind - with placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a', bindToolkit.placeholder);
  });

  bench('lodash/bind - with placeholder', () => {
    const object = {};
    bindLodash(fn, object, 'a', bindLodash.placeholder);
  });
});

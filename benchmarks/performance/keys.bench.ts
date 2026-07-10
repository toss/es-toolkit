import { bench, describe } from 'vitest';
import { keys as keysToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { keys: keysLodash } = lodash;

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

describe('keys', () => {
  bench('es-toolkit/compat/keys', () => {
    keysToolkit(object);
  });

  bench('lodash/keys', () => {
    keysLodash(object);
  });
});

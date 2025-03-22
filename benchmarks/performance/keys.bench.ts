import { bench, describe } from 'vitest';
import { keys as keysToolkit_ } from 'es-toolkit/compat';
import { keys as keysLodash_ } from 'lodash';

const keysToolkit = keysToolkit_;
const keysLodash = keysLodash_;

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

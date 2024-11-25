import { bench, describe } from 'vitest';
import { keysIn as keysInToolkit_ } from 'es-toolkit/compat';
import { keysIn as keysInLodash_ } from 'lodash';

const keysInToolkit = keysInToolkit_;
const keysInLodash = keysInLodash_;

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

describe('keysIn', () => {
  bench('es-toolkit/compat/keysIn', () => {
    keysInToolkit(object);
  });

  bench('lodash/keysIn', () => {
    keysInLodash(object);
  });
});

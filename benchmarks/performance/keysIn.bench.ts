import { bench, describe } from 'vitest';
import { keysIn as keysInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { keysIn: keysInLodash } = lodash;

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

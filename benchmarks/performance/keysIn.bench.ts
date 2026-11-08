import { keysIn as keysInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

group('keysIn', () => {
  bench('es-toolkit/compat/keysIn', () => {
    keysInToolkit(object);
  });

  bench('lodash/keysIn', () => {
    lodash.keysIn(object);
  });
});

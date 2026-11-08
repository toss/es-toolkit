import { keysIn as keysInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

group('keysIn', () => {
  bench('es-toolkit/compat/keysIn', () => {
    do_not_optimize(keysInToolkit(object));
  });

  bench('lodash/keysIn', () => {
    do_not_optimize(lodash.keysIn(object));
  });
});

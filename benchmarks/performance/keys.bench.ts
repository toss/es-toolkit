import { keys as keysToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

group('keys', () => {
  bench('es-toolkit/compat/keys', () => {
    do_not_optimize(keysToolkit(object));
  });

  bench('lodash/keys', () => {
    do_not_optimize(lodash.keys(object));
  });
});

import { keys as keysToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

class Foo {
  a = 1;
  b = 2;
  c = 3;
}

const object = new Foo();

group('keys', () => {
  bench('es-toolkit/compat/keys', () => {
    keysToolkit(object);
  });

  bench('lodash/keys', () => {
    lodash.keys(object);
  });
});

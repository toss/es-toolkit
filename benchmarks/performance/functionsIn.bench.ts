import { functionsIn as functionsInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('functionsIn', () => {
  class Foo {
    a = function () {
      return 'a';
    };

    b = function () {
      return 'b';
    };
    c() {
      return 'c';
    }
  }

  const foo = new Foo();
  const plainObject = {
    a: function () {
      return 'a';
    },
    b: function () {
      return 'b';
    },
  };

  bench('es-toolkit/compat/functionsIn', () => {
    functionsInToolkitCompat(foo);
    functionsInToolkitCompat(plainObject);
    functionsInToolkitCompat(null);
    functionsInToolkitCompat(undefined);
  });

  bench('lodash/functionsIn', () => {
    lodash.functionsIn(foo);
    lodash.functionsIn(plainObject);
    lodash.functionsIn(null);
    lodash.functionsIn(undefined);
  });
});

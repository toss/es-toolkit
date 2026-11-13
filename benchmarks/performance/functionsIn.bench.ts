import { functionsIn as functionsInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

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
    do_not_optimize(functionsInToolkitCompat(foo));
    do_not_optimize(functionsInToolkitCompat(plainObject));
    do_not_optimize(functionsInToolkitCompat(null));
    do_not_optimize(functionsInToolkitCompat(undefined));
  });

  bench('lodash/functionsIn', () => {
    do_not_optimize(lodash.functionsIn(foo));
    do_not_optimize(lodash.functionsIn(plainObject));
    do_not_optimize(lodash.functionsIn(null));
    do_not_optimize(lodash.functionsIn(undefined));
  });
});

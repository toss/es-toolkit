import { toPlainObject as toPlainObjectCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toPlainObject', () => {
  class Foo {
    b = 2;
  }
  (Foo.prototype as any).c = 3;
  const foo = new Foo();

  bench('es-toolkit/compat/toPlainObject', () => {
    do_not_optimize(toPlainObjectCompatToolkit(foo));
  });

  bench('lodash/toPlainObject', () => {
    do_not_optimize(lodash.toPlainObject(foo));
  });
});

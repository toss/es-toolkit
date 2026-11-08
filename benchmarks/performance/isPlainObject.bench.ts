import { isPlainObject as isPlainObjectToolkit } from 'es-toolkit';
import { isPlainObject as isPlainObjectCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = Object.create(null);
const buffer = Buffer.from('hello, world');

group('isPlainObject', () => {
  bench('es-toolkit/isPlainObject', () => {
    do_not_optimize(isPlainObjectToolkit({}));
    do_not_optimize(isPlainObjectToolkit([]));
    do_not_optimize(isPlainObjectToolkit(null));
    do_not_optimize(isPlainObjectToolkit(object));
    do_not_optimize(isPlainObjectToolkit(buffer));
  });

  bench('es-toolkit/compat/isPlainObject', () => {
    do_not_optimize(isPlainObjectCompatToolkit({}));
    do_not_optimize(isPlainObjectCompatToolkit([]));
    do_not_optimize(isPlainObjectCompatToolkit(null));
    do_not_optimize(isPlainObjectCompatToolkit(object));
    do_not_optimize(isPlainObjectCompatToolkit(buffer));
  });

  bench('lodash/isPlainObject', () => {
    do_not_optimize(lodash.isPlainObject({}));
    do_not_optimize(lodash.isPlainObject([]));
    do_not_optimize(lodash.isPlainObject(null));
    do_not_optimize(lodash.isPlainObject(object));
    do_not_optimize(lodash.isPlainObject(buffer));
  });
});

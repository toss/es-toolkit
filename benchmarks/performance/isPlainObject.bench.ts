import { isPlainObject as isPlainObjectToolkit } from 'es-toolkit';
import { isPlainObject as isPlainObjectCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = Object.create(null);
const buffer = Buffer.from('hello, world');

group('isPlainObject', () => {
  bench('es-toolkit/isPlainObject', () => {
    isPlainObjectToolkit({});
    isPlainObjectToolkit([]);
    isPlainObjectToolkit(null);
    isPlainObjectToolkit(object);
    isPlainObjectToolkit(buffer);
  });

  bench('es-toolkit/compat/isPlainObject', () => {
    isPlainObjectCompatToolkit({});
    isPlainObjectCompatToolkit([]);
    isPlainObjectCompatToolkit(null);
    isPlainObjectCompatToolkit(object);
    isPlainObjectCompatToolkit(buffer);
  });

  bench('lodash/isPlainObject', () => {
    lodash.isPlainObject({});
    lodash.isPlainObject([]);
    lodash.isPlainObject(null);
    lodash.isPlainObject(object);
    lodash.isPlainObject(buffer);
  });
});

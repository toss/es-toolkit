import { bench, describe } from 'vitest';
import { isPlainObject as isPlainObjectToolkit_ } from 'es-toolkit';
import { isPlainObject as isPlainObjectCompatToolkit_ } from 'es-toolkit/compat';
import { isPlainObject as isPlainObjectLodash_ } from 'lodash';

const isPlainObjectToolkit = isPlainObjectToolkit_;
const isPlainObjectCompatToolkit = isPlainObjectCompatToolkit_;
const isPlainObjectLodash = isPlainObjectLodash_;

const object = Object.create(null);
const buffer = Buffer.from('hello, world');

describe('isPlainObject', () => {
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
    isPlainObjectLodash({});
    isPlainObjectLodash([]);
    isPlainObjectLodash(null);
    isPlainObjectLodash(object);
    isPlainObjectLodash(buffer);
  });
});

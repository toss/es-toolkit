import { isPlainObject as isPlainObjectToolkit } from 'es-toolkit';
import { isPlainObject as isPlainObjectCompatToolkit } from 'es-toolkit/compat';
import { isPlainObject as isPlainObjectLodash } from 'lodash';
import { bench, describe } from '../bench';

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

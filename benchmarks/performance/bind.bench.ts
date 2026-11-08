import { bind as bindToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

function fn(this: any) {
  const result = [this];
  // eslint-disable-next-line prefer-rest-params
  return result.concat(Array.from(arguments));
}

group('bind - without placeholder', () => {
  bench('es-toolkit/bind - without placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a');
  });

  bench('lodash/bind - without placeholder', () => {
    const object = {};
    lodash.bind(fn, object, 'a');
  });
});

group('bind - with placeholder', () => {
  bench('es-toolkit/bind - with placeholder', () => {
    const object = {};
    bindToolkit(fn, object, 'a', bindToolkit.placeholder);
  });

  bench('lodash/bind - with placeholder', () => {
    const object = {};
    lodash.bind(fn, object, 'a', lodash.bind.placeholder);
  });
});

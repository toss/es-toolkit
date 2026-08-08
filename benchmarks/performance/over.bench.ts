import { bench, describe } from 'vitest';
import { over as overToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { over: overLodash } = lodash;

describe('over - math functions', () => {
  const mathFunctions = [Math.max, Math.min];
  bench('es-toolkit/over - math functions', () => {
    const func = overToolkitCompat(mathFunctions);
    func(1, 2, 3, 4);
    func(-10, 20, -5, 15);
    func(3.14, 2.71, 1.414, 1.732);
  });

  bench('lodash/over - math functions', () => {
    const func = overLodash(mathFunctions);
    func(1, 2, 3, 4);
    func(-10, 20, -5, 15);
    func(3.14, 2.71, 1.414, 1.732);
  });
});

describe('over - string functions', () => {
  const greet = (name: string) => `Hello, ${name}!`;
  const shout = (name: string) => `HEY, ${name.toUpperCase()}!!!`;
  bench('es-toolkit/over - string functions', () => {
    const func = overToolkitCompat([greet, shout]);
    func('world');
    func('javascript');
    func('es-toolkit');
  });

  bench('lodash/over - string functions', () => {
    const func = overLodash([greet, shout]);
    func('world');
    func('javascript');
    func('es-toolkit');
  });
});

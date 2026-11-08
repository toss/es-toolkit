import { over as overToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('over - math functions', () => {
  const mathFunctions = [Math.max, Math.min];
  bench('es-toolkit/over - math functions', () => {
    const func = overToolkitCompat(mathFunctions);
    func(1, 2, 3, 4);
    func(-10, 20, -5, 15);
    func(3.14, 2.71, 1.414, 1.732);
  });

  bench('lodash/over - math functions', () => {
    const func = lodash.over(mathFunctions);
    func(1, 2, 3, 4);
    func(-10, 20, -5, 15);
    func(3.14, 2.71, 1.414, 1.732);
  });
});

group('over - string functions', () => {
  const greet = (name: string) => `Hello, ${name}!`;
  const shout = (name: string) => `HEY, ${name.toUpperCase()}!!!`;
  bench('es-toolkit/over - string functions', () => {
    const func = overToolkitCompat([greet, shout]);
    func('world');
    func('javascript');
    func('es-toolkit');
  });

  bench('lodash/over - string functions', () => {
    const func = lodash.over([greet, shout]);
    func('world');
    func('javascript');
    func('es-toolkit');
  });
});

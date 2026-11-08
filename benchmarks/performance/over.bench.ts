import { over as overToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('over - math functions', () => {
  const mathFunctions = [Math.max, Math.min];
  bench('es-toolkit/over - math functions', () => {
    const func = overToolkitCompat(mathFunctions);
    do_not_optimize(func(1, 2, 3, 4));
    do_not_optimize(func(-10, 20, -5, 15));
    do_not_optimize(func(3.14, 2.71, 1.414, 1.732));
  });

  bench('lodash/over - math functions', () => {
    const func = lodash.over(mathFunctions);
    do_not_optimize(func(1, 2, 3, 4));
    do_not_optimize(func(-10, 20, -5, 15));
    do_not_optimize(func(3.14, 2.71, 1.414, 1.732));
  });
});

group('over - string functions', () => {
  const greet = (name: string) => `Hello, ${name}!`;
  const shout = (name: string) => `HEY, ${name.toUpperCase()}!!!`;
  bench('es-toolkit/over - string functions', () => {
    const func = overToolkitCompat([greet, shout]);
    do_not_optimize(func('world'));
    do_not_optimize(func('javascript'));
    do_not_optimize(func('es-toolkit'));
  });

  bench('lodash/over - string functions', () => {
    const func = lodash.over([greet, shout]);
    do_not_optimize(func('world'));
    do_not_optimize(func('javascript'));
    do_not_optimize(func('es-toolkit'));
  });
});

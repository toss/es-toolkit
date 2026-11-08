import { wrap as wrapToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('wrap', () => {
  bench('es-toolkit/compat/wrap', () => {
    wrapToolkit(
      (x: any) => x,
      (value, x) => value(x)
    );
  });

  bench('lodash/wrap', () => {
    lodash.wrap(
      (x: any) => x,
      (value, x) => value(x)
    );
  });
});

group('wrap/invoked', () => {
  bench('es-toolkit/compat/wrap', () => {
    const wrapped = wrapToolkit(
      (x: string) => x.toUpperCase(),
      (value, x: string) => `<p>${value(x)}</p>`
    );
    wrapped('hello');
  });

  bench('lodash/wrap', () => {
    const wrapped = lodash.wrap(
      (x: string) => x.toUpperCase(),
      (value, x: string) => `<p>${value(x)}</p>`
    );
    wrapped('hello');
  });
});

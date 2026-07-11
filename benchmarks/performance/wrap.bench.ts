import { bench, describe } from 'vitest';
import { wrap as wrapToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { wrap: wrapLodash } = lodash;

describe('wrap', () => {
  bench('es-toolkit/compat/wrap', () => {
    wrapToolkit(
      (x: any) => x,
      (value, x) => value(x)
    );
  });

  bench('lodash/wrap', () => {
    wrapLodash(
      (x: any) => x,
      (value, x) => value(x)
    );
  });
});

describe('wrap/invoked', () => {
  bench('es-toolkit/compat/wrap', () => {
    const wrapped = wrapToolkit(
      (x: string) => x.toUpperCase(),
      (value, x: string) => `<p>${value(x)}</p>`
    );
    wrapped('hello');
  });

  bench('lodash/wrap', () => {
    const wrapped = wrapLodash(
      (x: string) => x.toUpperCase(),
      (value, x: string) => `<p>${value(x)}</p>`
    );
    wrapped('hello');
  });
});

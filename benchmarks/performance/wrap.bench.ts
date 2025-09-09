import { bench, describe } from 'vitest';
import { wrap as wrapToolkit_ } from 'es-toolkit/compat';
import { wrap as wrapLodash_ } from 'lodash';

const wrapToolkit = wrapToolkit_;
const wrapLodash = wrapLodash_;

describe('wrap', () => {
  bench('es-toolkit/compat/wrap', () => {
    wrapToolkit(
      x => x,
      (value, x) => value(x)
    );
  });

  bench('lodash/wrap', () => {
    wrapLodash(
      x => x,
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

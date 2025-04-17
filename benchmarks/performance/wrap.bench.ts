import { bench, describe } from 'vitest';
import { wrap as wrapToolkit_ } from 'es-toolkit/compat';
import { wrap as wrapLodash_ } from 'lodash';

const wrapToolkit = wrapToolkit_;
const wrapLodash = wrapLodash_;

describe('wrap', () => {
  bench('es-toolkit/compat/wrap', () => {
    wrapToolkit(
      x => x,
      (fn, x) => fn(x)
    );
  });

  bench('lodash/wrap', () => {
    wrapLodash(
      x => x,
      (fn, x) => fn(x)
    );
  });
});

describe('wrap/invoked', () => {
  bench('es-toolkit/compat/wrap', () => {
    const wrapped = wrapToolkit(
      (x: string) => x.toUpperCase(),
      (fn, x) => `<p>${fn(x)}</p>`
    );
    wrapped('hello');
  });

  bench('lodash/wrap', () => {
    const wrapped = wrapLodash(
      (x: string) => x.toUpperCase(),
      (fn, x) => `<p>${fn(x)}</p>`
    );
    wrapped('hello');
  });
});

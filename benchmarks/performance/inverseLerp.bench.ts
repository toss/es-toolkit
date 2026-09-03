import { bench, describe } from 'vitest';
import { inverseLerp as inverseLerpToolkit } from 'es-toolkit';

// lodash has no inverseLerp, so this benchmark compares against the plain formula
// that users would otherwise write inline.
const inverseLerpInline = (a: number, b: number, value: number) => (value - a) / (b - a);

describe('inverseLerp', () => {
  bench('es-toolkit/inverseLerp', () => {
    inverseLerpToolkit(0, 100, 50);
    inverseLerpToolkit(10, 20, 20);
  });

  bench('inline (value - a) / (b - a)', () => {
    inverseLerpInline(0, 100, 50);
    inverseLerpInline(10, 20, 20);
  });
});

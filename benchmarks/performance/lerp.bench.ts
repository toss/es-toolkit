import { bench, describe } from 'vitest';
import { lerp as lerpToolkit } from 'es-toolkit';

// lodash has no lerp, so this benchmark compares against the plain formula
// that users would otherwise write inline.
const lerpInline = (a: number, b: number, t: number) => a + (b - a) * t;

describe('lerp', () => {
  bench('es-toolkit/lerp', () => {
    lerpToolkit(0, 100, 0.5);
    lerpToolkit(10, 20, 1);
  });

  bench('inline a + (b - a) * t', () => {
    lerpInline(0, 100, 0.5);
    lerpInline(10, 20, 1);
  });
});

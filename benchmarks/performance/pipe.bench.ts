import { bench, describe } from 'vitest';
import { pipe as pipeToolkit_ } from 'es-toolkit';

const pipeToolkit = pipeToolkit_;

describe('pipe', () => {
  const double = (n: number) => n * 2;
  const square = (n: number) => n * n;

  bench('es-toolkit/pipe', () => {
    pipeToolkit(5, double, square);
  });
});

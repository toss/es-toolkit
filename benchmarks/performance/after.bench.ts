import { bench, describe, vi } from 'vitest';
import { after as afterToolkit } from 'es-toolkit';
import { after as afterLodash } from 'lodash';

describe('after', () => {
  bench('es-toolkit/after', () => {
    const mockFn = vi.fn();
    const n = 10;
    const afterFn = afterToolkit(n, mockFn);
    for (let i = 0; i < n + 1; i++) {
      afterFn();
    }
  });

  bench('lodash/after', () => {
    const mockFn = vi.fn();
    const n = 10;
    const afterFn = afterLodash(n, mockFn);
    for (let i = 0; i < n + 1; i++) {
      afterFn();
    }
  });
});

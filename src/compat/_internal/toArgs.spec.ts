import { describe, expect, it } from 'vitest';
import { toArgs } from './toArgs';

describe('toArgs', () => {
  it('converts an array to an arguments object', () => {
    const result = toArgs([1, 2, 3]);

    expect(result.toString()).toBe('[object Arguments]');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (function (..._args) {
      // eslint-disable-next-line prefer-rest-params
      expect(arguments).toEqual(result);
    })(1, 2, 3);
  });
});

import { describe, expect, it } from 'vitest';
import { isWindow } from './isWindow.ts';

describe('isWindow', () => {
  it('should return "false" if the element is not the `Window` object', () => {
    expect(isWindow({})).toBeFalsy();
    expect(isWindow([])).toBeFalsy();
    expect(isWindow(1)).toBeFalsy();
    expect(isWindow('')).toBeFalsy();
  });
});

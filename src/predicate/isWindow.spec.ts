import { describe, expect, it, vi } from 'vitest';
import { isWindow } from './isWindow.ts';

describe('isWindow', () => {
  it('should return "true" if the element is the `Window` object', () => {
    const div = document.createElement('div');

    expect(isWindow(window)).toBeTruthy();

    expect(isWindow(window.document)).toBeFalsy();
    expect(isWindow({})).toBeFalsy();
    expect(isWindow(div)).toBeFalsy();
    expect(isWindow(1)).toBeFalsy();
    expect(isWindow('')).toBeFalsy();
  });

  it('should return "false" if the element is not the `Window` object', () => {
    const windowSpy = vi.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => undefined as unknown as typeof globalThis.window);

    expect(isWindow(window)).toBeFalsy();
  });
});

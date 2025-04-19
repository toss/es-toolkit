import { isBrowser } from './isBrowser.ts';

export function isWindow(element: unknown): element is Window {
  if (!isBrowser()) {
    return false;
  }

  return element === window;
}

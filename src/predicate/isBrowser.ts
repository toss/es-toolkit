declare let window:
  | {
      document: unknown;
    }
  | undefined;

/**
 * Checks if the current environment is a browser.
 *
 * This function checks for the existence of the `window.document` property,
 * which only exists in browser environments.
 *
 * @returns {boolean} `true` if the current environment is a browser, otherwise `false`.
 *
 * @example
 * if (isBrowser()) {
 *   console.log("This is running in a browser");
 *   document.getElementById('app').innerHTML = 'Hello World';
 * }
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && window?.document != null;
}

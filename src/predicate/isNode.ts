declare let process:
  | {
      versions?: {
        node?: unknown;
      };
    }
  | undefined;

/**
 * Checks if the current environment is Node.js.
 *
 * This function checks for the existence of the `process.versions.node` property,
 * which only exists in Node.js environments.
 *
 * @returns {boolean} `true` if the current environment is Node.js, otherwise `false`.
 *
 * @example
 *if (isNode()) {
 *   console.log('This is running in Node.js');
 *   const fs = import('node:fs');
 * }
 */
export function isNode(): boolean {
  return typeof process !== 'undefined' && process?.versions?.node != null;
}

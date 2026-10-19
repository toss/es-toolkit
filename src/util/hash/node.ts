import { hash as sha256 } from 'node:crypto';
import { serialize } from '../serialize/serialize.ts';

/**
 * Hashes any value into a stable 43-character string.
 *
 * The value is serialized with `serialize`, so two values with the same
 * structure always hash to the same string regardless of key insertion
 * order, and then digested with SHA-256 and encoded in Base64URL format.
 *
 * The hash is stable across platforms, but it is not designed for security
 * purposes; intentional collisions can be crafted from user input.
 *
 * This entry uses the native `node:crypto` implementation and requires
 * Node.js 20.12 or later; in browsers, a pure JavaScript implementation
 * with identical output is used instead.
 *
 * @param value - The value to hash.
 * @returns The Base64URL-encoded SHA-256 hash of the serialized value.
 * @throws {TypeError} If the value contains an object that cannot be serialized.
 *
 * @example
 * hash({ b: 2, a: 1 }) === hash({ a: 1, b: 2 }); // true
 * hash([1, 2, 3]); // "phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ" (43 characters)
 */
export function hash(value: unknown): string {
  return sha256('sha256', serialize(value), 'base64url');
}

/**
 * An error class representing an aborted operation.
 * @augments Error
 */
export class AbortError extends Error {
  constructor(message = 'The operation was aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

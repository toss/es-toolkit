/**
 * An error class representing an aborted operation.
 * @extends Error
 */
export class AbortError extends Error {
  constructor(message = 'The operation was aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

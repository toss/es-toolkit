/**
 * An error class representing an timeout operation.
 * @augments Error
 */
export class TimeoutError extends DOMException {
  constructor(message = 'The operation was timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

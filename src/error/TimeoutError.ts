/**
 * An error class representing a timeout operation.
 * @augments DOMException
 */
export class TimeoutError extends DOMException {
  constructor(message = 'The operation was timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

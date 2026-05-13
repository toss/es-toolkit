import { DOMException } from '../_internal/DOMException.ts';

/**
 * An error class representing an aborted operation.
 * @augments DOMException
 */
export class AbortError extends DOMException {
  constructor(message = 'The operation was aborted') {
    super(message);
  }
}

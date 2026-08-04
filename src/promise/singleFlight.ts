import { isNotNil } from '../predicate';

/**
 * Shares the Promise of the first in-flight asynchronous task with subsequent callers.
 *
 * A `SingleFlight` does not cache settled results. Once the task resolves or rejects,
 * the next call starts a new task.
 *
 * @example
 * const flight = new SingleFlight();
 *
 * const first = flight.run(() => fetch('/api/config'));
 * const second = flight.run(() => fetch('/api/config'));
 *
 * console.log(first === second); // true
 */
export class SingleFlight {
  private currentPromise: Promise<unknown> | undefined;

  /**
   * Runs a task, or returns the Promise of the task that is already in flight.
   *
   * If the task rejects, the rejection is shared with all callers that joined the
   * same flight. A later call after settlement starts a new task.
   *
   * @template T - The result type of the task.
   * @param task - An asynchronous task to run.
   * @returns The Promise shared by all callers of the current flight.
   *
   * @example
   * const flight = new SingleFlight();
   *
   * const first = flight.run(async () => {
   *   const response = await fetch('/api/config');
   *   return response.json();
   * });
   *
   * const second = flight.run(async () => {
   *   const response = await fetch('/api/config');
   *   return response.json();
   * });
   *
   * console.log(first === second); // true
   */
  run<T>(task: () => Promise<T>): Promise<T> {
    if (isNotNil(this.currentPromise)) {
      return this.currentPromise as Promise<T>;
    }

    let resolvePromise!: (value: T | PromiseLike<T>) => void;
    let rejectPromise!: (reason?: unknown) => void;
    const promise = new Promise<T>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    this.currentPromise = promise;

    try {
      Promise.resolve(task()).then(resolvePromise, rejectPromise);
    } catch (error) {
      rejectPromise(error);
    }

    promise.then(
      () => this.clearPromise(promise),
      () => this.clearPromise(promise)
    );

    return promise;
  }

  private clearPromise(promise: Promise<unknown>): void {
    if (this.currentPromise === promise) {
      this.currentPromise = undefined;
    }
  }
}

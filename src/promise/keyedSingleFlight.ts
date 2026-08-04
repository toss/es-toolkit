import { SingleFlight } from './singleFlight.ts';
import { isNil } from '../predicate';

/**
 * Shares in-flight asynchronous tasks independently for each key.
 *
 * A `KeyedSingleFlight` does not cache settled results. Once a task resolves or rejects,
 * the next call for that key starts a new task.
 *
 * @template K - The type of the keys used to identify tasks.
 *
 * @example
 * const flight = new KeyedSingleFlight<string>();
 *
 * const first = flight.run('user:1', () => fetch('/api/users/1'));
 * const second = flight.run('user:1', () => fetch('/api/users/1'));
 * const other = flight.run('user:2', () => fetch('/api/users/2'));
 *
 * console.log(first === second); // true
 * console.log(first === other); // false
 */
export class KeyedSingleFlight<K> {
  private flights = new Map<K, SingleFlight>();

  /**
   * Runs a task for a key, or returns the Promise of the task already in flight for that key.
   *
   * Tasks for different keys can run concurrently. If a task rejects, the rejection is shared
   * with all callers that joined the same key's flight.
   *
   * @template T - The result type of the task.
   * @param key - The key used to identify the task.
   * @param task - An asynchronous task to run.
   * @returns The Promise shared by all callers of the key's current flight.
   *
   * @example
   * const flight = new KeyedSingleFlight<string>();
   *
   * const user = await flight.run('user:1', async () => {
   *   const response = await fetch('/api/users/1');
   *   return response.json();
   * });
   */
  run<T>(key: K, task: () => Promise<T>): Promise<T> {
    let flight = this.flights.get(key);

    if (isNil(flight)) {
      flight = new SingleFlight();
      this.flights.set(key, flight);
    }

    const promise = flight.run(task);

    promise.then(
      () => this.deleteFlight(key, flight!),
      () => this.deleteFlight(key, flight!)
    );

    return promise;
  }

  private deleteFlight(key: K, flight: SingleFlight): void {
    if (this.flights.get(key) === flight) {
      this.flights.delete(key);
    }
  }
}

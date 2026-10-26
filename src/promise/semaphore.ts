import { Queue } from '../util/queue.ts';

/**
 * A counting semaphore for async functions that manages available permits.
 * Semaphores are mainly used to limit the number of concurrent async tasks.
 *
 * Each `acquire` operation takes a permit or waits until one is available.
 * Each `release` operation adds a permit, potentially allowing a waiting task to proceed.
 *
 * The semaphore ensures fairness by maintaining a FIFO (First In, First Out) order for acquirers.
 *
 * @example
 * const sema = new Semaphore(2);
 *
 * async function task() {
 *   await sema.acquire();
 *   try {
 *     // This code can only be executed by two tasks at the same time
 *   } finally {
 *     sema.release();
 *   }
 * }
 *
 * task();
 * task();
 * task(); // This task will wait until one of the previous tasks releases the semaphore.
 */
export class Semaphore {
  /**
   * The maximum number of concurrent operations allowed.
   * @type {number}
   */
  public capacity: number;

  /**
   * The number of available permits.
   * @type {number}
   */
  public available: number;

  // `Array#shift` is O(n) on large arrays in V8, which made draining a long queue quadratic.
  private deferredTasks = new Queue<() => void>();

  /**
   * Creates an instance of Semaphore.
   * @param capacity - The maximum number of concurrent operations allowed.
   *
   * @example
   * const sema = new Semaphore(3); // Allows up to 3 concurrent operations.
   */
  constructor(capacity: number) {
    this.capacity = capacity;
    this.available = capacity;
  }

  /**
   * Acquires a semaphore, blocking if necessary until one is available.
   * @returns A promise that resolves when the semaphore is acquired.
   *
   * @example
   * const sema = new Semaphore(1);
   *
   * async function criticalSection() {
   *   await sema.acquire();
   *   try {
   *     // This code section cannot be executed simultaneously
   *   } finally {
   *     sema.release();
   *   }
   * }
   */
  async acquire(): Promise<void> {
    if (this.available > 0) {
      this.available--;
      return;
    }

    return new Promise<void>(resolve => {
      this.deferredTasks.enqueue(resolve);
    });
  }

  /**
   * Releases a semaphore, allowing one more operation to proceed.
   *
   * @example
   * const sema = new Semaphore(1);
   *
   * async function task() {
   *   await sema.acquire();
   *   try {
   *     // This code can only be executed by two tasks at the same time
   *   } finally {
   *     sema.release(); // Allows another waiting task to proceed.
   *   }
   * }
   */
  release(): void {
    const deferredTask = this.deferredTasks.dequeue();

    if (deferredTask != null) {
      deferredTask();
      return;
    }

    if (this.available < this.capacity) {
      this.available++;
    }
  }
}

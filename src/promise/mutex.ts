import { Semaphore } from './semaphore.ts';

/**
 * A Mutex (mutual exclusion lock) for async functions.
 * It allows only one async task to access a critical section at a time.
 *
 * @example
 * const mutex = new Mutex();
 *
 * async function criticalSection() {
 *   await mutex.acquire();
 *   try {
 *     // This code section cannot be executed simultaneously
 *   } finally {
 *     mutex.release();
 *   }
 * }
 *
 * criticalSection();
 * criticalSection(); // This call will wait until the first call releases the mutex.
 */
export class Mutex {
  private semaphore = new Semaphore(1);

  /**
   * Checks if the mutex is currently locked.
   * @returns {boolean} True if the mutex is locked, false otherwise.
   *
   * @example
   * const mutex = new Mutex();
   * console.log(mutex.isLocked); // false
   * await mutex.acquire();
   * console.log(mutex.isLocked); // true
   * mutex.release();
   * console.log(mutex.isLocked); // false
   */
  get isLocked(): boolean {
    return this.semaphore.available === 0;
  }

  /**
   * Acquires the mutex, blocking if necessary until it is available.
   * @returns {Promise<void>} A promise that resolves when the mutex is acquired.
   *
   * @example
   * const mutex = new Mutex();
   * await mutex.acquire();
   * try {
   *   // This code section cannot be executed simultaneously
   * } finally {
   *   mutex.release();
   * }
   */
  async acquire(): Promise<void> {
    return this.semaphore.acquire();
  }

  /**
   * Releases the mutex, allowing another waiting task to proceed.
   *
   * @example
   * const mutex = new Mutex();
   * await mutex.acquire();
   * try {
   *   // This code section cannot be executed simultaneously
   * } finally {
   *   mutex.release(); // Allows another waiting task to proceed.
   * }
   */
  release(): void {
    this.semaphore.release();
  }
}

import { describe, expect, it, vi } from 'vitest';
import { SingleFlight } from './singleFlight';

describe('SingleFlight', () => {
  it('shares the same promise for concurrent calls', async () => {
    const flight = new SingleFlight();
    let resolveTask!: (value: number) => void;
    const task = vi.fn(() => new Promise<number>(resolve => (resolveTask = resolve)));

    const first = flight.run(task);
    const second = flight.run(task);

    expect(task).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);

    resolveTask(42);
    await expect(first).resolves.toBe(42);
    await expect(second).resolves.toBe(42);
  });

  it('shares rejection and starts a new task after rejection', async () => {
    const flight = new SingleFlight();
    const error = new Error('failed');
    const firstTask = vi.fn(() => Promise.reject(error));
    const secondTask = vi.fn(() => Promise.resolve('recovered'));

    const first = flight.run(firstTask);
    const duplicate = flight.run(secondTask);

    expect(duplicate).toBe(first);
    await expect(first).rejects.toBe(error);
    expect(secondTask).not.toHaveBeenCalled();

    await expect(flight.run(secondTask)).resolves.toBe('recovered');
    expect(secondTask).toHaveBeenCalledTimes(1);
  });

  it('turns a synchronous task throw into a rejected promise', async () => {
    const flight = new SingleFlight();
    const error = new Error('failed synchronously');

    await expect(
      flight.run(() => {
        throw error;
      })
    ).rejects.toBe(error);
    await expect(flight.run(() => Promise.resolve('next'))).resolves.toBe('next');
  });

  it('shares the promise with a reentrant call', async () => {
    const flight = new SingleFlight();
    let reentrantPromise!: Promise<number>;

    const first = flight.run(async () => {
      reentrantPromise = flight.run(() => Promise.resolve(42));
      return 42;
    });

    expect(reentrantPromise).toBe(first);
    await expect(first).resolves.toBe(42);
  });
});

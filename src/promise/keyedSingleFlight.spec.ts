import { describe, expect, it, vi } from 'vitest';
import { KeyedSingleFlight } from './keyedSingleFlight';

describe('KeyedSingleFlight', () => {
  it('shares work independently for each key', async () => {
    const flight = new KeyedSingleFlight<string>();
    const firstTask = vi.fn(() => Promise.resolve('first'));
    const duplicateTask = vi.fn(() => Promise.resolve('duplicate'));
    const otherTask = vi.fn(() => Promise.resolve('other'));

    const first = flight.run('same', firstTask);
    const duplicate = flight.run('same', duplicateTask);
    const other = flight.run('other', otherTask);

    expect(duplicate).toBe(first);
    expect(firstTask).toHaveBeenCalledTimes(1);
    expect(duplicateTask).not.toHaveBeenCalled();
    expect(otherTask).toHaveBeenCalledTimes(1);
    await expect(Promise.all([first, duplicate, other])).resolves.toEqual(['first', 'first', 'other']);
  });

  it('removes a key after the shared operation settles', async () => {
    const flight = new KeyedSingleFlight<string>();
    const first = flight.run('key', () => Promise.resolve(1));
    await expect(first).resolves.toBe(1);

    const secondTask = vi.fn(() => Promise.resolve(2));
    await expect(flight.run('key', secondTask)).resolves.toBe(2);
    expect(secondTask).toHaveBeenCalledTimes(1);
  });

  it('shares rejection and restarts the key after rejection', async () => {
    const flight = new KeyedSingleFlight<string>();
    const error = new Error('failed');
    const firstTask = vi.fn(() => Promise.reject(error));
    const duplicateTask = vi.fn(() => Promise.resolve('duplicate'));

    const first = flight.run('key', firstTask);
    const duplicate = flight.run('key', duplicateTask);

    expect(duplicate).toBe(first);
    await expect(first).rejects.toBe(error);
    expect(duplicateTask).not.toHaveBeenCalled();

    await expect(flight.run('key', duplicateTask)).resolves.toBe('duplicate');
    expect(duplicateTask).toHaveBeenCalledTimes(1);
  });

  it('supports arbitrary Map keys', async () => {
    const flight = new KeyedSingleFlight<object>();
    const key = {};
    const sameKeyTask = vi.fn(() => Promise.resolve('same'));
    const otherKeyTask = vi.fn(() => Promise.resolve('other'));

    const first = flight.run(key, sameKeyTask);
    const duplicate = flight.run(key, otherKeyTask);
    const other = flight.run({}, otherKeyTask);

    expect(duplicate).toBe(first);
    await expect(Promise.all([first, duplicate, other])).resolves.toEqual(['same', 'same', 'other']);
    expect(otherKeyTask).toHaveBeenCalledTimes(1);
  });
});

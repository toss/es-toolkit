import { describe, expect, it } from 'vitest';
import { Queue } from './queue';

describe('Queue', () => {
  it('should dequeue items in the order they were enqueued', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it('should return undefined when dequeuing an empty queue', () => {
    const queue = new Queue<number>();

    expect(queue.dequeue()).toBeUndefined();
    expect(queue.size).toBe(0);
  });

  it('should keep track of the size', () => {
    const queue = new Queue<string>();

    expect(queue.size).toBe(0);

    queue.enqueue('a');
    queue.enqueue('b');
    expect(queue.size).toBe(2);

    queue.dequeue();
    expect(queue.size).toBe(1);

    queue.dequeue();
    queue.dequeue();
    expect(queue.size).toBe(0);
  });

  it('should peek at the front item without removing it', () => {
    const queue = new Queue<string>();

    expect(queue.peek()).toBeUndefined();

    queue.enqueue('a');
    queue.enqueue('b');

    expect(queue.peek()).toBe('a');
    expect(queue.size).toBe(2);
  });

  it('should enqueue correctly after being emptied', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.dequeue();
    queue.enqueue(2);
    queue.enqueue(3);

    expect([...queue]).toEqual([2, 3]);
    expect(queue.peek()).toBe(2);
  });

  it('should clear all items', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();

    expect(queue.size).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect([...queue]).toEqual([]);

    queue.enqueue(3);
    expect([...queue]).toEqual([3]);
  });

  it('should handle falsy and undefined items', () => {
    const queue = new Queue<number | undefined>();

    queue.enqueue(0);
    queue.enqueue(undefined);
    queue.enqueue(1);

    expect(queue.size).toBe(3);
    expect([...queue]).toEqual([0, undefined, 1]);
    expect(queue.dequeue()).toBe(0);
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.size).toBe(1);
  });

  it('should iterate from front to back without removing items', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const values: number[] = [];

    for (const value of queue) {
      values.push(value);
    }

    expect(values).toEqual([1, 2, 3]);
    expect(Array.from(queue)).toEqual([1, 2, 3]);
    expect(queue.size).toBe(3);
  });
});

import { describe, expect, it } from 'vitest';
import { dequeue, enqueue, type QueueState } from './queue';

describe('queue', () => {
  it('should dequeue items in the order they were enqueued', () => {
    const queue: QueueState<number> = { h: null, t: null };

    enqueue(queue, 1);
    enqueue(queue, 2);
    enqueue(queue, 3);

    expect(dequeue(queue)).toBe(1);
    expect(dequeue(queue)).toBe(2);
    expect(dequeue(queue)).toBe(3);
    expect(dequeue(queue)).toBeUndefined();
  });

  it('should enqueue correctly after being emptied', () => {
    const queue: QueueState<number> = { h: null, t: null };

    enqueue(queue, 1);
    dequeue(queue);

    expect(queue.t).toBeNull();

    enqueue(queue, 2);
    enqueue(queue, 3);

    expect(dequeue(queue)).toBe(2);
    expect(dequeue(queue)).toBe(3);
  });

  it('should keep the order with many items', () => {
    const queue: QueueState<number> = { h: null, t: null };

    for (let i = 0; i < 30000; i++) {
      enqueue(queue, i);
    }

    for (let i = 0; i < 30000; i++) {
      expect(dequeue(queue)).toBe(i);
    }

    expect(dequeue(queue)).toBeUndefined();
  });
});

import { bench, describe } from 'vitest';
import { Queue as QueueToolkit } from 'es-toolkit';

describe('Queue', () => {
  bench('es-toolkit/Queue', () => {
    const queue = new QueueToolkit<number>();

    for (let i = 0; i < 10000; i++) {
      queue.enqueue(i);
    }

    while (queue.size > 0) {
      queue.dequeue();
    }
  });

  bench('Array#push/shift', () => {
    const array: number[] = [];

    for (let i = 0; i < 10000; i++) {
      array.push(i);
    }

    while (array.length > 0) {
      array.shift();
    }
  });
});

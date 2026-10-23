import { bench, describe } from 'vitest';
import { Queue as QueueToolkit } from 'es-toolkit';
import QueueYocto from 'yocto-queue';

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

  bench('yocto-queue', () => {
    const queue = new QueueYocto<number>();

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

describe('Queue/iterate', () => {
  const queueToolkit = new QueueToolkit<number>();
  const queueYocto = new QueueYocto<number>();

  for (let i = 0; i < 10000; i++) {
    queueToolkit.enqueue(i);
    queueYocto.enqueue(i);
  }

  bench('es-toolkit/Queue', () => {
    let sum = 0;

    for (const value of queueToolkit) {
      sum += value;
    }

    return sum;
  });

  bench('yocto-queue', () => {
    let sum = 0;

    for (const value of queueYocto) {
      sum += value;
    }

    return sum;
  });
});

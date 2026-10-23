interface QueueNode<T> {
  value: T;
  next: QueueNode<T> | undefined;
}

/**
 * A first-in, first-out (FIFO) queue backed by a linked list.
 *
 * Unlike `Array.prototype.shift`, which takes linear time, `dequeue` takes constant time,
 * so it stays fast no matter how many items are in the queue.
 *
 * The queue is iterable, so you can loop over its items from front to back with `for...of`
 * or spread it into an array. Iterating does not remove items from the queue.
 *
 * @template T - The type of items in the queue.
 *
 * @example
 * const queue = new Queue<string>();
 *
 * queue.enqueue('a');
 * queue.enqueue('b');
 *
 * console.log(queue.size); // 2
 * console.log([...queue]); // ['a', 'b']
 *
 * console.log(queue.dequeue()); // 'a'
 * console.log(queue.dequeue()); // 'b'
 * console.log(queue.dequeue()); // undefined
 */
export class Queue<T> implements Iterable<T> {
  private head: QueueNode<T> | undefined = undefined;
  private tail: QueueNode<T> | undefined = undefined;
  private length = 0;

  /**
   * The number of items in the queue.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * console.log(queue.size); // 1
   */
  get size(): number {
    return this.length;
  }

  /**
   * Adds an item to the back of the queue.
   *
   * @param value - The item to add.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * queue.enqueue(2);
   * console.log([...queue]); // [1, 2]
   */
  enqueue(value: T): void {
    const node: QueueNode<T> = { value, next: undefined };

    if (this.tail === undefined) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length++;
  }

  /**
   * Removes and returns the item at the front of the queue.
   *
   * @returns The removed item, or `undefined` if the queue is empty.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * console.log(queue.dequeue()); // 1
   * console.log(queue.dequeue()); // undefined
   */
  dequeue(): T | undefined {
    const node = this.head;

    if (node === undefined) {
      return undefined;
    }

    this.head = node.next;

    if (this.head === undefined) {
      this.tail = undefined;
    }

    this.length--;

    return node.value;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   *
   * @returns The item at the front, or `undefined` if the queue is empty.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * console.log(queue.peek()); // 1
   * console.log(queue.size); // 1
   */
  peek(): T | undefined {
    return this.head?.value;
  }

  /**
   * Removes all items from the queue.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * queue.clear();
   * console.log(queue.size); // 0
   */
  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  /**
   * Returns an iterator that removes items from the front of the queue as you consume it.
   *
   * @returns An iterator over the removed items.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * queue.enqueue(2);
   *
   * for (const value of queue.drain()) {
   *   console.log(value); // 1, then 2
   * }
   *
   * console.log(queue.size); // 0
   */
  *drain(): Generator<T, void, undefined> {
    while (this.head !== undefined) {
      yield this.dequeue() as T;
    }
  }

  /**
   * Returns an iterator over the items in the queue from front to back, without removing them.
   *
   * @returns An iterator over the items.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * queue.enqueue(2);
   * console.log([...queue]); // [1, 2]
   */
  *[Symbol.iterator](): Generator<T, void, undefined> {
    let node = this.head;

    while (node !== undefined) {
      yield node.value;
      node = node.next;
    }
  }
}

// Field names are short because minifiers don't rename properties.
interface QueueNode<T> {
  /** The item. */
  v: T;
  /** The next node, or `null` if this is the last one. */
  n: QueueNode<T> | null;
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
  #head: QueueNode<T> | null = null;
  #tail: QueueNode<T> | null = null;
  #size = 0;

  /**
   * The number of items in the queue.
   *
   * @example
   * const queue = new Queue<number>();
   * queue.enqueue(1);
   * console.log(queue.size); // 1
   */
  get size(): number {
    return this.#size;
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
    const node: QueueNode<T> = { v: value, n: null };

    if (this.#tail === null) {
      this.#head = node;
    } else {
      this.#tail.n = node;
    }

    this.#tail = node;
    this.#size++;
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
    const node = this.#head;

    if (node === null) {
      return undefined;
    }

    this.#head = node.n;

    if (this.#head === null) {
      this.#tail = null;
    }

    this.#size--;

    return node.v;
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
    return this.#head?.v;
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
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
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
    let node = this.#head;

    while (node !== null) {
      yield node.v;
      node = node.n;
    }
  }
}

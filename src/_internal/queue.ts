// Field names are short because minifiers don't rename properties, and this queue ships inside other functions.
interface QueueNode<T> {
  /** The item. */
  v: T;
  /** The next node, or `null` if this is the last one. */
  n: QueueNode<T> | null;
}

/**
 * A first-in, first-out (FIFO) queue backed by a linked list.
 *
 * Unlike `Array.prototype.shift`, which is O(n) on large arrays in V8, `dequeue` takes constant time.
 * It only has what internal callers need. Use the public `Queue` class for everything else.
 *
 * Create it as `{ h: null, t: null }`. Setting both fields up front keeps the object's shape
 * the same, which keeps `enqueue` and `dequeue` fast.
 */
export interface QueueState<T> {
  /** The first node, or `null` if the queue is empty. */
  h: QueueNode<T> | null;
  /** The last node, or `null` if the queue is empty. */
  t: QueueNode<T> | null;
}

export function enqueue<T>(queue: QueueState<T>, value: T): void {
  const node: QueueNode<T> = { v: value, n: null };

  if (queue.t == null) {
    queue.h = node;
  } else {
    queue.t.n = node;
  }

  queue.t = node;
}

/**
 * Removes and returns the item at the front of the queue, or `undefined` if the queue is empty.
 */
export function dequeue<T>(queue: QueueState<T>): T | undefined {
  const node = queue.h;

  if (node == null) {
    return undefined;
  }

  queue.h = node.n;

  if (queue.h == null) {
    queue.t = null;
  }

  return node.v;
}

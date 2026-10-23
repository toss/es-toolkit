# Queue

Creates a first-in, first-out (FIFO) queue.

```typescript
const queue = new Queue<T>();
```

## Usage

### `Queue()`

Use `Queue` when you process items in the order they arrive, such as task lists or breadth-first search. The `dequeue` and `enqueue` methods stay fast no matter how many items are in the queue.

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<string>();

// Adds items to the back of the queue.
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');

// Removes items from the front of the queue.
queue.dequeue();
// Returns: 'a'

// Looks at the front item without removing it.
queue.peek();
// Returns: 'b'

queue.size;
// Returns: 2
```

The queue is iterable, so you can loop over it with `for...of` or spread it into an array. Iterating does not remove items.

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);

// Loops from front to back.
for (const value of queue) {
  console.log(value); // 1, 2
}

// Spreads the queue into an array.
[...queue];
// Returns: [1, 2]

queue.size;
// Returns: 2
```

#### Properties

- `size` (`number`): The number of items in the queue.

#### Methods

- `enqueue` (`(value: T) => void`): Adds an item to the back of the queue.
- `dequeue` (`() => T | undefined`): Removes and returns the item at the front of the queue. Returns `undefined` if the queue is empty.
- `peek` (`() => T | undefined`): Returns the item at the front of the queue without removing it. Returns `undefined` if the queue is empty.
- `clear` (`() => void`): Removes all items from the queue.
- `[Symbol.iterator]` (`() => Generator<T>`): Returns an iterator over the items from front to back, without removing them.

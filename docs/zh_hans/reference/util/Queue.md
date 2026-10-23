# Queue

创建一个先进先出(FIFO)的队列。

```typescript
const queue = new Queue<T>();
```

## 用法

### `Queue()`

当需要按照到达顺序处理值时(例如任务列表或广度优先搜索),请使用 `Queue`。`dequeue` 和 `enqueue` 方法无论队列中有多少值都能保持快速。

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<string>();

// 在队列末尾添加值。
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');

// 从队列开头取出值。
queue.dequeue();
// Returns: 'a'

// 查看开头的值但不取出。
queue.peek();
// Returns: 'b'

queue.size;
// Returns: 2
```

队列是可迭代的,因此可以用 `for...of` 遍历,或用展开语法转换为数组。遍历不会从队列中移除值。如果希望在遍历时取出值,请使用 `drain`。

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);

// 从开头依次遍历,不取出值。
[...queue];
// Returns: [1, 2]

// 遍历时逐个取出值。
for (const value of queue.drain()) {
  console.log(value); // 1,然后是 2
}

queue.size;
// Returns: 0
```

#### 属性

- `size` (`number`): 队列中值的数量。

#### 方法

- `enqueue` (`(value: T) => void`): 在队列末尾添加值。
- `dequeue` (`() => T | undefined`): 取出并返回队列开头的值。队列为空时返回 `undefined`。
- `peek` (`() => T | undefined`): 返回队列开头的值但不取出。队列为空时返回 `undefined`。
- `clear` (`() => void`): 移除队列中的所有值。
- `drain` (`() => Generator<T>`): 返回一个迭代器,每消费一个值就从队列开头取出该值。
- `[Symbol.iterator]` (`() => Generator<T>`): 返回一个从开头依次遍历且不取出值的迭代器。

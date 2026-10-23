# Queue

먼저 넣은 값을 먼저 꺼내는(FIFO) 큐를 만들어요.

```typescript
const queue = new Queue<T>();
```

## 사용법

### `Queue()`

작업 목록이나 너비 우선 탐색처럼 들어온 순서대로 값을 처리해야 할 때 `Queue`를 사용하세요. `dequeue`, `enqueue` 메서드는 큐에 값이 아무리 많아도 빠르게 동작해요.

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<string>();

// 큐의 맨 뒤에 값을 넣어요.
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');

// 큐의 맨 앞에서 값을 꺼내요.
queue.dequeue();
// Returns: 'a'

// 맨 앞의 값을 꺼내지 않고 확인해요.
queue.peek();
// Returns: 'b'

queue.size;
// Returns: 2
```

큐는 이터러블이라서 `for...of`로 순회하거나 전개 구문으로 배열로 바꿀 수 있어요. 순회해도 값은 큐에서 사라지지 않아요.

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);

// 앞에서부터 순회해요.
for (const value of queue) {
  console.log(value); // 1, 2
}

// 큐를 배열로 바꿔요.
[...queue];
// Returns: [1, 2]

queue.size;
// Returns: 2
```

#### 프로퍼티

- `size` (`number`): 큐에 들어 있는 값의 개수예요.

#### 메서드

- `enqueue` (`(value: T) => void`): 큐의 맨 뒤에 값을 넣어요.
- `dequeue` (`() => T | undefined`): 큐의 맨 앞에 있는 값을 꺼내서 반환해요. 큐가 비어 있으면 `undefined`를 반환해요.
- `peek` (`() => T | undefined`): 큐의 맨 앞에 있는 값을 꺼내지 않고 반환해요. 큐가 비어 있으면 `undefined`를 반환해요.
- `clear` (`() => void`): 큐의 모든 값을 지워요.
- `[Symbol.iterator]` (`() => Generator<T>`): 값을 꺼내지 않고 앞에서부터 순회하는 이터레이터를 반환해요.

# Queue

先に入れた値を先に取り出す(FIFO)キューを作成します。

```typescript
const queue = new Queue<T>();
```

## 使用法

### `Queue()`

タスクリストや幅優先探索のように、届いた順に値を処理したいときに `Queue` を使用してください。`dequeue`、`enqueue` メソッドはキューにどれだけ値があっても高速に動作します。

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<string>();

// キューの末尾に値を追加します。
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');

// キューの先頭から値を取り出します。
queue.dequeue();
// Returns: 'a'

// 先頭の値を取り出さずに確認します。
queue.peek();
// Returns: 'b'

queue.size;
// Returns: 2
```

キューはイテラブルなので、`for...of` でループしたり、スプレッド構文で配列に変換したりできます。ループしても値はキューから削除されません。

```typescript
import { Queue } from 'es-toolkit/util';

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);

// 先頭から順にループします。
for (const value of queue) {
  console.log(value); // 1, 2
}

// キューを配列に変換します。
[...queue];
// Returns: [1, 2]

queue.size;
// Returns: 2
```

#### プロパティ

- `size` (`number`): キューに入っている値の数です。

#### メソッド

- `enqueue` (`(value: T) => void`): キューの末尾に値を追加します。
- `dequeue` (`() => T | undefined`): キューの先頭の値を取り出して返します。キューが空の場合は `undefined` を返します。
- `peek` (`() => T | undefined`): キューの先頭の値を取り出さずに返します。キューが空の場合は `undefined` を返します。
- `clear` (`() => void`): キューのすべての値を削除します。
- `[Symbol.iterator]` (`() => Generator<T>`): 値を取り出さずに先頭から順にループするイテレーターを返します。

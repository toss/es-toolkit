# KeyedSingleFlight

キーごとに非同期タスクを1つだけ実行し、重複した呼び出しに実行中のPromiseを共有します。

```typescript
const flight = new KeyedSingleFlight<string>();
```

## 使用法

### `KeyedSingleFlight<K>()`

キーごとにタスクを重複排除し、異なるキーのタスクは並行して実行したい場合に`KeyedSingleFlight`を使用します。

```typescript
import { KeyedSingleFlight } from 'es-toolkit';

const flight = new KeyedSingleFlight<string>();

const first = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const second = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const other = flight.run('user:2', async () => {
  const response = await fetch('/api/users/2');
  return response.json();
});

console.log(first === second); // true
console.log(first === other); // false
```

タスクが成功した場合も失敗した場合も同じPromiseを共有します。タスクが完了すると結果はキャッシュされず、同じキーの次の呼び出しでは新しいタスクを実行します。キーは`Map`と同じ規則で比較されるため、オブジェクトキーは参照が同じ場合のみ一致します。

#### パラメータ

- `K`（`unknown`）：タスクを識別するキーの型です。

#### メソッド

- `run`（`(key: K, task: () => Promise<T>) => Promise<T>`）：タスクを実行するか、そのキーで実行中のタスクのPromiseを返します。

# SingleFlight

同時に実行される非同期タスクを1つに制限し、重複した呼び出しに実行中のPromiseを共有します。

```typescript
const flight = new SingleFlight();
```

## 使用法

### `SingleFlight()`

複数の呼び出し元が同じ処理を同時に開始する可能性があり、実際の処理は1回だけ実行したい場合に`SingleFlight`を使用します。

```typescript
import { SingleFlight } from 'es-toolkit';

const flight = new SingleFlight();

const first = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

const second = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

console.log(first === second); // true
```

タスクが成功した場合も失敗した場合も同じPromiseを共有します。タスクが完了すると結果はキャッシュされず、次の呼び出しでは新しいタスクを実行します。

#### メソッド

- `run`（`(task: () => Promise<T>) => Promise<T>`）：タスクを実行するか、すでに実行中のタスクのPromiseを返します。

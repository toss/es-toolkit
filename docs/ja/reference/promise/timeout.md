# timeout

指定された時間後に`TimeoutError`を発生させる`Promise`を返します。

```typescript
await timeout(ms, options?);
```

## 使用法

### `timeout(ms, options?)`

特定の時間が経過した後にタイムアウトエラーを発生させたい場合に`timeout`を使用します。他のPromiseと`Promise.race()`を一緒に使用して、タスクに時間制限を設定する際に便利です。

```typescript
import { timeout } from 'es-toolkit/promise';

// 基本的な使用 - 1秒後にTimeoutErrorが発生
try {
  await timeout(1000);
  console.log('このコードは実行されません');
} catch (error) {
  console.log('タイムアウトエラー発生:', error.message); // 'The operation was timed out'
}
```

`Promise.race()`と一緒に使用してタスクに時間制限を設定できます:

```typescript
async function fetchWithTimeout(url: string) {
  try {
    const result = await Promise.race([
      fetch(url),
      timeout(5000), // 5秒制限
    ]);
    return result;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('リクエストに時間がかかりすぎています');
    }
    throw error;
  }
}
```

複数の非同期タスクのいずれかが決められた時間内に完了しない場合、全体のタスクを失敗させたい場合にも使用できます。

```typescript
async function multipleOperationsWithTimeout() {
  try {
    await Promise.race([
      Promise.all([fetch('/api/data1'), fetch('/api/data2'), fetch('/api/data3')]),
      timeout(3000), // 全体のタスクに3秒制限
    ]);
    console.log('すべてのタスクが時間内に完了しました');
  } catch (error) {
    console.log('タスクが時間内に完了しませんでした');
  }
}
```

`AbortSignal`を渡してタイムアウトをキャンセルできます。`delay`とは異なり、中断してもPromiseは拒否されません。`timeout`は`Promise.race()`で負けるためだけに存在するため、キャンセルするとPromiseは保留状態のまま残り、タイムアウトが囲んでいた処理が時間制限なしで最後まで進められます。

```typescript
const controller = new AbortController();

// ユーザーが待ち続けることを選んだら、1秒の制限を解除します。
keepWaitingButton.onclick = () => controller.abort();

const result = await Promise.race([
  doWork(),
  timeout(1000, { signal: controller.signal }), // 中断後は拒否されません
]);
```

#### パラメータ

- `ms` (`number`): `TimeoutError`が発生するまでのミリ秒単位の時間です。
- `options` (`TimeoutOptions`, オプション): タイムアウトオプションです。
  - `signal` (`AbortSignal`, オプション): タイムアウトをキャンセルできるAbortSignalです。中断されると、返されるPromiseは保留状態のままで拒否されません。

#### 戻り値

(`Promise<never>`): 指定された時間後に`TimeoutError`で拒否されるPromiseを返します。`AbortSignal`が先に中断された場合、Promiseは解決も拒否もされません。

#### エラー

指定された時間が経過すると`TimeoutError`をスローします。`AbortSignal`を中断してもエラーはスローされず、タイムアウトがキャンセルされてPromiseは保留状態のままになります。

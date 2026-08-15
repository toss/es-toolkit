# withTimeout

非同期関数に時間制限を設定し、指定された時間内に完了しない場合は`TimeoutError`を発生させます。

```typescript
await withTimeout(run, ms, options?);
```

## 使用法

### `withTimeout(run, ms, options?)`

非同期タスクにタイムアウトを設定したい場合に`withTimeout`を使用します。Promiseが指定された時間内に完了しない場合、`TimeoutError`で拒否されるため、無限に待機する状況を防ぐことができます。

```typescript
import { withTimeout } from 'es-toolkit/promise';

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

try {
  // 1秒以内に完了する必要があります
  const data = await withTimeout(fetchData, 1000);
  console.log('データを受信しました:', data);
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('リクエストがタイムアウトしました');
  }
}
```

データベースクエリに時間制限を設定したい場合にも使用できます。

```typescript
async function queryDatabase(query: string) {
  // データベースクエリロジック
  return await db.execute(query);
}

try {
  const result = await withTimeout(
    () => queryDatabase('SELECT * FROM users'),
    5000 // 5秒制限
  );
  console.log('クエリ結果:', result);
} catch (error) {
  console.log('クエリに時間がかかりすぎたためキャンセルされました');
}
```

複数のAPI呼び出しの中で最も速いレスポンスだけを受け取りたい場合にも活用できます。

```typescript
async function getFastestResponse() {
  const apis = [() => fetch('/api/server1'), () => fetch('/api/server2'), () => fetch('/api/server3')];

  try {
    // 各APIに2秒制限を設定し、最も速く応答したものだけを受け取ります
    const promises = apis.map(api => withTimeout(api, 2000));
    const result = await Promise.race(promises);
    return result.json();
  } catch (error) {
    console.log('すべてのAPIがタイムアウトしました');
  }
}
```

`AbortSignal`を渡してタイムアウトをキャンセルできます。中断すると時間制限が解除され、`run`は期限なしで待機されます。返されるPromiseを拒否したり、`run`自体を中断したりはしません。実際の処理もキャンセルしたい場合は、同じシグナルを`run`にも渡してください。

```typescript
const controller = new AbortController();

// ユーザーが待ち続けることを選んだら、1秒の制限を解除します。
keepWaitingButton.onclick = () => controller.abort();

const data = await withTimeout(fetchData, 1000, { signal: controller.signal });
```

#### パラメータ

- `run` (`() => Promise<T>`): 実行する非同期関数です。
- `ms` (`number`): タイムアウトが発生するまでのミリ秒単位の時間です。
- `options` (`WithTimeoutOptions`, オプション): タイムアウトオプションです。
  - `signal` (`AbortSignal`, オプション): タイムアウトをキャンセルできるAbortSignalです。中断されると時間制限が解除され、`run`は期限なしで待機されます。

#### 戻り値

(`Promise<T>`): 与えられた非同期関数が返す結果、または時間切れ時にTimeoutErrorで拒否されるPromiseを返します。

#### エラー

指定された時間内に完了しない場合、`TimeoutError`をスローします。

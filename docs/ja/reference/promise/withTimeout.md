# withTimeout

非同期関数に時間制限を設定し、指定された時間内に完了しない場合は`TimeoutError`を発生させます。

```typescript
await withTimeout(run, ms);
```

## 参照

### `withTimeout(run, ms)`

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

#### パラメータ

- `run` (`() => Promise<T>`): 実行する非同期関数です。
- `ms` (`number`): タイムアウトが発生するまでのミリ秒単位の時間です。

#### 戻り値

(`Promise<T>`): 与えられた非同期関数が返す結果、または時間切れ時にTimeoutErrorで拒否されるPromiseを返します。

#### エラー

指定された時間内に完了しない場合、`TimeoutError`をスローします。

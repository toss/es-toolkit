# attemptAsync

非同期関数を実行し、結果またはエラーをタプルとして返します。

```typescript
const [error, result] = await attemptAsync(func);
```

## 使用法

### `attemptAsync(func)`

非同期関数を安全に実行したい場合は `attemptAsync` を使用してください。async/await ブロックを try-catch でラップすることなくエラーを処理できます。

```typescript
import { attemptAsync } from 'es-toolkit/util';

// API リクエストが成功する場合
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// error は null、data はレスポンスデータ

// ネットワークエラーが発生する場合
const [error, data] = await attemptAsync(async () => {
  throw new Error('ネットワークエラー');
});
// error は Error オブジェクト、data は null

// 型を明示することもできます
interface User {
  id: number;
  name: string;
}

const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users は User[] 型として推論されます
```

データベースクエリやファイル読み込みなどの非同期操作でエラー処理が必要な場合に特に便利です。

```typescript
// ファイル読み込みの例
const [error, content] = await attemptAsync(async () => {
  const fs = await import('fs/promises');
  return fs.readFile('config.json', 'utf8');
});

if (error) {
  console.log('ファイルを読み込めません:', error.message);
} else {
  console.log('ファイル内容:', content);
}
```

::: info 同期関数には attempt を使用してください

この関数は非同期関数(`Promise` を返す関数)の処理に適しています。同期関数を処理する場合は、[`attempt`](./attempt.md) 関数を使用することをお勧めします。

:::

#### パラメータ

- `func` (`() => Promise<T>`): 実行する非同期関数です。

#### 戻り値

(`Promise<[null, T] | [E, null]>`): 成功時は `[null, 結果値]`、エラー発生時は `[エラー, null]` のタプルに解決される Promise を返します。

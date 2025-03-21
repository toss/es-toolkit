# attemptAsync

非同期関数を実行し、結果またはエラーを含むタプルを返します。

## シグネチャ

```typescript
function attemptAsync<AttemptResult, AttemptError>(
  func: () => Promise<AttemptResult>
): Promise<[null, AttemptResult] | [AttemptError, null]>;
```

### パラメータ

- `func` (`() => Promise<AttemptResult>`): 実行を試みる非同期関数。

### 戻り値

(`Promise<[null, AttemptResult] | [AttemptError, null]>`): 以下のようなタプルに解決するPromiseを返します:

- 成功時: `[null, AttemptResult]` - 最初の要素は`null`、2番目は結果
- エラー発生時: `[AttemptError, null]` - 最初の要素はキャッチされたエラー、2番目は`null`

## 例

```typescript
import { attemptAsync } from 'es-toolkit/function';

// 成功時の実行
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// 成功時: [null, { ... data ... }]

// 失敗時の実行
const [error, data] = await attemptAsync(async () => {
  throw new Error('ネットワークエラー');
});
// [Error, null]

// 型パラメータを使用
const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// usersはUser[]型として推論されます
```

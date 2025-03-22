# attemptAsync

::: info
この関数は非同期関数（`Promise`を返す関数）を処理するのに適しています。
同期関数を処理するには、代わりに`attempt`関数を使用することをお勧めします。
:::

非同期関数を実行し、結果またはエラーを含むタプルを返します。

## インターフェース

```typescript
function attemptAsync<T, E>(func: () => Promise<T>): Promise<[null, T] | [E, null]>;
```

### パラメータ

- `func` (`() => Promise<T>`): 実行を試みる非同期関数です。

### 戻り値

(`Promise<[null, T] | [E, null]>`): 以下のようなタプルに解決するPromiseを返します:

- 成功時: `[null, T]` - 最初の要素は`null`、2番目は結果です。
- エラー発生時: `[E, null]` - 最初の要素はキャッチされたエラー、2番目は`null`です。

## 例

```typescript
import { attemptAsync } from 'es-toolkit/function';

// 成功時には [null, 関数の戻り値] タプルを返します。
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// [null, レスポンスオブジェクト]

// エラーが発生すると [関数がスローしたエラー, null] タプルを返します。
const [error, data] = await attemptAsync(async () => {
  throw new Error('ネットワークエラー');
});
// [Error, null]

// ジェネリック型を使用すると、関数がスローするエラーと戻り値の型を指定できます。
const [error, users] = await attemptAsync<User[], Error>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// `error`は`Error`型として、`users`は`User[]`型として推論されます。
```

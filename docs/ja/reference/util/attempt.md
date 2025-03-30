# attempt

::: info
重要: この関数は非同期関数（`Promise`を返す関数）には適していません。
非同期関数を渡すと、`[null, Promise<T>]`を返しますが、Promiseが後で拒否された場合でもエラーをキャッチしません。

非同期関数を処理するには、代わりに`attemptAsync`関数を使用することをお勧めします。
:::

関数を実行し、結果またはエラーを含むタプルを返します。

## インターフェース

```typescript
function attempt<T, E>(func: () => T): [null, T] | [E, null];
```

### パラメータ

- `func` (`() => T`): 実行を試みる関数です。

### 戻り値

(`[null, T] | [E, null]`): 以下のようなタプルを返します:

- 成功時: `[null, T]` - 最初の要素は`null`、2番目は結果です。
- エラー発生時: `[E, null]` - 最初の要素はキャッチされたエラー、2番目は`null`です。

## 例

```typescript
import { attempt } from 'es-toolkit/function';

// 成功時には [null, 関数の戻り値] タプルを返します。
const [error, result] = attempt(() => 42);
// [null, 42]

// エラーが発生すると [関数がスローしたエラー, null] タプルを返します。
const [error, result] = attempt(() => {
  throw new Error('問題が発生しました');
});
// [Error, null]

// ジェネリック型を使用すると、関数がスローするエラーと戻り値の型を指定できます。
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// `error`は`Error`型として、`names`は`string[]`型として推論されます。
```

# forEachRight (Lodash 互換性)

::: warning `es-toolkit`の`forEachRight`を使用してください

この`forEachRight`関数は、`null`や`undefined`の処理、`ArrayLike`タイプの処理、さまざまな条件関数形式のサポートなどにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[forEachRight](../../array/forEachRight.md)を使用してください。

:::

配列またはオブジェクトの要素を右から左に走査し、各要素に対して関数を実行します。

```typescript
forEachRight(collection, callback);
```

## 参照

### `forEachRight(collection, callback)`

配列、オブジェクト、文字列を右から左の順序で走査し、各要素に対してコールバック関数を実行します。コールバックが`false`を返すと走査を中断します。

```typescript
import { forEachRight } from 'es-toolkit/compat';

// 配列を逆順で走査します
forEachRight([1, 2, 3], (value, index) => {
  console.log(value, index);
});
// 出力: 3 2, 2 1, 1 0

// 文字列を逆順で走査します
forEachRight('abc', (char, index) => {
  console.log(char, index);
});
// 出力: 'c' 2, 'b' 1, 'a' 0

// オブジェクトを逆順で走査します
forEachRight({ a: 1, b: 2, c: 3 }, (value, key) => {
  console.log(value, key);
});
// 出力: 3 'c', 2 'b', 1 'a'
```

`null`または`undefined`はそのまま返します。

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight(null, value => console.log(value)); // null
forEachRight(undefined, value => console.log(value)); // undefined
```

コールバックが`false`を返すと走査を中断します。

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight([1, 2, 3, 4], value => {
  console.log(value);
  if (value === 2) {
    return false; // 走査を中断
  }
});
// 出力: 4, 3, 2
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 走査するコレクションです。配列、オブジェクト、文字列、またはnull/undefinedを指定できます。
- `callback` (`(item: any, index: any, arr: any) => unknown`, 選択): 各要素に対して実行する関数です。`false`を返すと走査を中断します。デフォルトは`identity`関数です。

#### 戻り値

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 元のコレクションをそのまま返します。

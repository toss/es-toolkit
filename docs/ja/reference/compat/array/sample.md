# sample（Lodash 互換性）

::: warning `es-toolkit` の [sample](../../array/sample.md) を使用してください

この `sample` 関数は、`null` や `undefined` の処理、オブジェクト値の処理などにより、遅く動作します。

より高速でモダンな `es-toolkit` の [sample](../../array/sample.md) を使用してください。

:::

配列またはオブジェクトからランダムな要素を1つ取得します。

```typescript
const randomItem = sample(collection);
```

## 使用法

### `sample(collection)`

配列またはオブジェクトからランダムな要素を1つ選択する場合は `sample` を使用します。配列ではランダムな要素を返し、オブジェクトではランダムな値を返します。

```typescript
import { sample } from 'es-toolkit/compat';

// 配列からランダムな要素を取得
sample([1, 2, 3, 4, 5]);
// 1から5の中からランダムな数値を1つ返します

// オブジェクトからランダムな値を取得
sample({ a: 1, b: 2, c: 3 });
// 1、2、3の中からランダムな値を1つ返します

// 文字列も処理します
sample('hello');
// 'h'、'e'、'l'、'l'、'o'の中からランダムな文字を1つ返します
```

`null` や `undefined` は `undefined` を返します。

```typescript
import { sample } from 'es-toolkit/compat';

sample(null); // undefined
sample(undefined); // undefined
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): サンプリングする配列またはオブジェクト。

#### 戻り値

(`T | string | undefined`): 配列またはオブジェクトからランダムに選択された要素を返します。コレクションが空であるか `null`、`undefined` の場合は `undefined` を返します。

# tail (Lodash 互換性)

::: warning `es-toolkit`の[tail](../../array/tail.md)を使用してください

この`tail`関数は、`null`や`undefined`の処理などにより遅く動作します。

代わりに、より高速で現代的な`es-toolkit`の[tail](../../array/tail.md)を使用してください。

:::

配列の最初の要素を除いた残りの要素を返します。

```typescript
const result = tail(array);
```

## 使用法

### `tail(array)`

配列の最初の要素を除いたすべての要素を含む新しい配列を作成したい場合は`tail`を使用してください。入力配列が空または要素が1つだけの場合は空の配列を返します。

```typescript
import { tail } from 'es-toolkit/compat';

// 数値配列から最初の要素を削除します。
tail([1, 2, 3]);
// Returns: [2, 3]

// 文字列配列から最初の要素を削除します。
tail(['a', 'b', 'c']);
// Returns: ['b', 'c']

// 要素が1つだけの配列です。
tail([1]);
// Returns: []

// 空の配列です。
tail([]);
// Returns: []
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { tail } from 'es-toolkit/compat';

tail(null); // []
tail(undefined); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 最初の要素を削除する配列です。

#### 戻り値

(`T[]`): 最初の要素を除いた残りの要素を含む新しい配列を返します。

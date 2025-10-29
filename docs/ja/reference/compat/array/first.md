# first (Lodash 互換性)

::: warning `es-toolkit`の`head`を使用してください

この`first`関数は、`null`や`undefined`の処理と配列のようなオブジェクトの変換により、動作が遅くなります。`es-toolkit`の`head`関数は、これらの追加処理なしで、より高速かつシンプルに動作します。

代わりに、より高速で現代的な`es-toolkit`の[head](../../array/head.md)を使用してください。

:::

配列の最初の要素を返します。

```typescript
const firstElement = first(array);
```

## 参照

### `first(array)`

配列の最初の要素を取得したい場合は`first`を使用してください。配列が空であるか、`null`、`undefined`の場合は`undefined`を返します。

```typescript
import { first } from 'es-toolkit/compat';

// 通常の配列から最初の要素を取得
first([1, 2, 3]);
// Returns: 1

// 文字列配列から最初の要素を取得
first(['a', 'b', 'c']);
// Returns: 'a'

// 空の配列
first([]);
// Returns: undefined
```

`null`または`undefined`は`undefined`を返します。

```typescript
import { first } from 'es-toolkit/compat';

first(null); // undefined
first(undefined); // undefined
```

配列のようなオブジェクトでも使用できます。

```typescript
import { first } from 'es-toolkit/compat';

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
first(arrayLike);
// Returns: 'a'

// 文字列も配列のように処理されます
first('hello');
// Returns: 'h'
```

型が保証されたタプルでは、正確な型を返します。

```typescript
import { first } from 'es-toolkit/compat';

const tuple = [1, 'two', true] as const;
first(tuple);
// Returns: 1 (型は1と推論されます)
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 最初の要素を取得する配列です。

#### 戻り値

(`T | undefined`): 配列の最初の要素を返します。配列が空または無効な場合は`undefined`を返します。

# flattenDeep (Lodash 互換性)

::: warning `es-toolkit`の`flattenDeep`を使用してください

この`flattenDeep`関数は、`null`や`undefined`の処理、`ArrayLike`型の処理、様々な条件関数形式のサポートなどにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[flattenDeep](../../array/flattenDeep.md)を使用してください。

:::

配列を完全に平坦化します。

```typescript
const result = flattenDeep(array);
```

## 使用法

### `flattenDeep(value)`

ネストされた配列をすべての深さで再帰的に平坦化します。すべてのネストレベルが削除され、完全に平坦化された1次元配列を返します。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

// 深くネストされた配列を完全に平坦化
flattenDeep([1, [2, [3, [4]], 5]]);
// 結果: [1, 2, 3, 4, 5]

// 複雑なネスト構造も完全に平坦化
flattenDeep([1, [2, [3, [[[[4]]]]], 5]]);
// 結果: [1, 2, 3, 4, 5]

// 混合された型もサポート
flattenDeep(['a', ['b', ['c', [['d']]]]]);
// 結果: ['a', 'b', 'c', 'd']
```

空の配列やnull、undefinedは空の配列を返します。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep(null); // []
flattenDeep(undefined); // []
flattenDeep([]); // []
```

すでに平坦化された配列はそのままコピーされます。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep([1, 2, 3, 4, 5]);
// 結果: [1, 2, 3, 4, 5]
```

#### パラメータ

- `value` (`ListOfRecursiveArraysOrValues<T> | null | undefined`): 完全に平坦化する配列です。

#### 戻り値

(`Array<T>`): すべてのネストが削除された完全に平坦化された新しい配列を返します。

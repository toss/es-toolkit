# flatten (Lodash 互換性)

::: warning `es-toolkit`の`flatten`を使用してください

この`flatten`関数は、`null`や`undefined`の処理、`ArrayLike`型の処理などにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[flatten](../../../reference/array/flatten.md)を使用してください。

:::

配列を1段階平坦化します。

```typescript
const result = flatten(array);
```

## 使用法

### `flatten(array)`

ネストされた配列を1段階平坦化します。

```typescript
import { flatten } from 'es-toolkit/compat';

// 基本的な平坦化(1段階)
flatten([1, [2, [3, [4]], 5]]);
// 結果: [1, 2, [3, [4]], 5]

// Argumentsオブジェクトのサポート
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 結果: [1, 2, 3, [4]]

// Symbol.isConcatSpreadableを持つオブジェクトのサポート
const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 結果: [1, 'a', 'b', 3]
```

`null`や`undefined`は空の配列として処理されます。

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 平坦化する配列です。

#### 戻り値

(`T[]`): 平坦化された新しい配列を返します。

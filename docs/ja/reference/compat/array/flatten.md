# flatten (Lodash 互換性)

::: warning `es-toolkit`の`flatten`を使用してください

この`flatten`関数は、`null`や`undefined`の処理、`ArrayLike`型の処理、様々な条件関数形式のサポートなどにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[flatten](../../array/flatten.md)を使用してください。

:::

配列を1段階平坦化します。

```typescript
const result = flatten(array, depth);
```

## 参照

### `flatten(value, depth)`

ネストされた配列を指定された深さだけ平坦化します。デフォルトでは1段階のみ平坦化し、ArgumentsオブジェクトやSymbol.isConcatSpreadableを持つオブジェクトもサポートします。

```typescript
import { flatten } from 'es-toolkit/compat';

// 基本的な平坦化(1段階)
flatten([1, [2, [3, [4]], 5]]);
// 結果: [1, 2, [3, [4]], 5]

// 深さを指定
flatten([1, [2, [3, [4]], 5]], 2);
// 結果: [1, 2, 3, [4], 5]

// Argumentsオブジェクトのサポート
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 結果: [1, 2, 3, [4]]
```

空の配列やnull、undefinedは空の配列を返します。

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

Symbol.isConcatSpreadableを持つオブジェクトも配列のように平坦化されます。

```typescript
import { flatten } from 'es-toolkit/compat';

const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 結果: [1, 'a', 'b', 3]
```

#### パラメータ

- `value` (`ArrayLike<T> | null | undefined`): 平坦化する配列です。
- `depth` (`number`, オプション): 平坦化する最大深さです。デフォルトは`1`です。

#### 戻り値

(`T[]`): 平坦化された新しい配列を返します。

# pull (Lodash 互換性)

::: warning `es-toolkit` の [pull](../../array/pull.md) を使用してください

この `pull` 関数は Lodash 互換性のための関数であり、より複雑な型処理とオーバーロードにより動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [pull](../../array/pull.md) を使用してください。

:::

配列から指定された値をすべて削除します。

```typescript
const result = pull(array, ...valuesToRemove);
```

## 使用法

### `pull(array, ...valuesToRemove)`

配列から指定された値をすべて削除し、元の配列を変更します。配列をコピーせずに元の配列を直接変更することでメモリを節約できます。

```typescript
import { pull } from 'es-toolkit/compat';

// 数値配列から特定の値を削除
const numbers = [1, 2, 3, 2, 4, 2, 5];
pull(numbers, 2, 3);
console.log(numbers); // [1, 4, 5]

// 文字列配列から特定の値を削除
const fruits = ['apple', 'banana', 'apple', 'cherry'];
pull(fruits, 'apple');
console.log(fruits); // ['banana', 'cherry']
```

#### パラメータ

- `array` (`T[]`): 変更する配列です。
- `...valuesToRemove` (`T[]`): 配列から削除する値です。

#### 戻り値

(`T[]`): 変更された元の配列を返します。

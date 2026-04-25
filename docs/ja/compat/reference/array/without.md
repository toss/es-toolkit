# without (Lodash互換)

::: warning `es-toolkit`の[without](../../array/without.md)を使用してください

この`without`関数はLodash互換性のための追加処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[without](../../array/without.md)を使用してください。

:::

配列から指定された値を除外した新しい配列を作成します。

```typescript
const result = without([1, 2, 3, 4, 5], 2, 4);
// resultは[1, 3, 5]になります。
```

## 使用法

### `without(array, ...values)`

配列から指定された値を削除した新しい配列を返します。元の配列は変更されません。

```typescript
import { without } from 'es-toolkit/compat';

// 数値配列から複数の値を削除
const numbers = [1, 2, 3, 4, 5, 2, 4];
const result1 = without(numbers, 2, 4);
// 戻り値: [1, 3, 5]

// 文字列配列から値を削除
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const result2 = without(fruits, 'banana');
// 戻り値: ['apple', 'cherry']

// 空配列を処理
const result3 = without([], 1, 2, 3);
// 戻り値: []
```

#### パラメータ

- `array` (`T[]`): 処理する元の配列。
- `...values` (`T[]`): 削除する値。

#### 戻り値

(`T[]`): 指定された値を削除した新しい配列。

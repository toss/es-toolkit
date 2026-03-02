# pullAll (Lodash 互換性)

指定された値を含む配列のすべての値を配列から削除します。

```typescript
const result = pullAll(array, valuesToRemove);
```

## 使用法

### `pullAll(array, valuesToRemove)`

`valuesToRemove` 配列に含まれるすべての値を配列から削除し、元の配列を変更します。`pull` 関数と似ていますが、削除する値を配列として受け取ります。

```typescript
import { pullAll } from 'es-toolkit/compat';

// 数値配列から特定の値を削除
const numbers = [1, 2, 3, 2, 4, 2, 5];
pullAll(numbers, [2, 3]);
console.log(numbers); // [1, 4, 5]

// 文字列配列から特定の値を削除
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];
pullAll(fruits, ['apple', 'banana']);
console.log(fruits); // ['cherry']
```

空の配列、`null`、または `undefined` を渡すと、何も削除されません。

```typescript
import { pullAll } from 'es-toolkit/compat';

const numbers = [1, 2, 3];
pullAll(numbers, []);
console.log(numbers); // [1, 2, 3]

pullAll(numbers, null);
console.log(numbers); // [1, 2, 3]
```

#### パラメータ

- `array` (`T[]`): 変更する配列です。
- `valuesToRemove` (`ArrayLike<T>`, オプション): 配列から削除する値を含む配列です。デフォルトは `[]` です。

#### 戻り値

(`T[]`): 変更された元の配列を返します。

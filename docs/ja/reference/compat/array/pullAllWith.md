# pullAllWith (Lodash 互換性)

比較関数を使用して、指定された値を配列から削除します。

```typescript
const modified = pullAllWith(array, valuesToRemove, comparator);
```

## 使用法

### `pullAllWith(array, values, comparator)`

提供された比較関数を使用して、配列から指定された値を削除します。元の配列が変更され、変更された配列が返されます。

```typescript
import { pullAllWith } from 'es-toolkit/compat';

// オブジェクトの比較で削除
const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
console.log(array); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]

// 文字列の長さで比較して削除
const words = ['hello', 'world', 'test', 'code'];
pullAllWith(words, ['hi'], (a, b) => a.length === b.length);
console.log(words); // ['hello', 'world', 'code'] ('test'が'hi'と同じ長さのため削除される)
```

配列が空または `null`、`undefined` の場合、元の配列がそのまま返されます。

```typescript
import { pullAllWith } from 'es-toolkit/compat';

pullAllWith([], [1], (a, b) => a === b); // []
pullAllWith(null as any, [1], (a, b) => a === b); // null
```

#### パラメータ

- `array` (`T[]`): 変更する配列です。
- `values` (`ArrayLike<T>`, オプション): 削除する値の配列です。
- `comparator` (`(a: T, b: T) => boolean`, オプション): 2つの要素を比較する関数です。2つの要素が等しいと判断される場合は `true` を返す必要があります。

#### 戻り値

(`T[]`): 指定された値が削除された元の配列を返します。

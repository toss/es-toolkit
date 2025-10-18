# pullAllBy (Lodash 互換性)

iterateeで変換された値を基準に指定された値を配列から削除します。

```typescript
const modified = pullAllBy(array, valuesToRemove, iteratee);
```

## 参照

### `pullAllBy(array, values, iteratee)`

提供されたiteratee関数を通じて各要素を変換した値を基準に配列から指定された値を削除します。元の配列が変更され、変更された配列が返されます。

```typescript
import { pullAllBy } from 'es-toolkit/compat';

// プロパティ値で比較して削除
const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
console.log(array); // [{ x: 2 }]

// 関数で値を変換して比較
const numbers = [1, 2, 3, 4, 5];
pullAllBy(numbers, [2, 4], n => n % 2);
console.log(numbers); // [1, 3, 5] (奇数のみ残る)
```

配列が空、`null`、または `undefined` の場合、元の配列をそのまま返します。

```typescript
import { pullAllBy } from 'es-toolkit/compat';

pullAllBy([], [1, 2], x => x); // []
pullAllBy(null as any, [1, 2], x => x); // null
```

#### パラメータ

- `array` (`T[]`): 変更する配列です。
- `values` (`ArrayLike<T>`, オプション): 削除する値の配列です。
- `iteratee` (`ValueIteratee<T>`, オプション): 各要素に適用するiteratee関数です。プロパティ名、部分オブジェクト、または関数を使用できます。

#### 戻り値

(`T[]`): 指定された値が削除された元の配列を返します。

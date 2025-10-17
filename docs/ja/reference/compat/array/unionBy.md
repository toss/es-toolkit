# unionBy (Lodash互換)

::: warning `es-toolkit`の[unionBy](../../array/unionBy.md)を使用してください

この`unionBy`関数は複雑な処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[unionBy](../../array/unionBy.md)を使用してください。

:::

複数の配列をマージし、指定された基準に基づいてユニークな値のみを残します。

```typescript
const result = unionBy(...arrays, iteratee);
```

## 参照

### `unionBy(...arrays, iteratee)`

複数の配列をマージし、与えられた基準関数に基づいて重複を削除してユニークな値のみを含む新しい配列を作成したい場合は`unionBy`を使用してください。各値が最初に出現する順序を保持します。

```typescript
import { unionBy } from 'es-toolkit/compat';

// 小数を切り捨てて比較
unionBy([2.1], [1.2, 2.3], Math.floor);
// 戻り値: [2.1, 1.2]

// オブジェクトのプロパティで比較
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// 戻り値: [{ x: 1 }, { x: 2 }]

// 関数で比較
unionBy(
  [{ id: 1, name: 'a' }],
  [
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
  ],
  item => item.id
);
// 戻り値: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]

// 部分オブジェクトで比較
unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], { x: 1 });
// 戻り値: [{ x: 1, y: 1 }]

// プロパティ-値配列で比較
unionBy([{ active: true, name: 'a' }], [{ active: false, name: 'b' }], ['active', true]);
// 戻り値: [{ active: true, name: 'a' }, { active: false, name: 'b' }]
```

`null`または`undefined`配列は無視されます。

```typescript
import { unionBy } from 'es-toolkit/compat';

unionBy([1, 2], null, undefined, [3, 4], x => x);
// 戻り値: [1, 2, 3, 4]
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): マージする配列。
- `iteratee` (`ValueIteratee<T>`): ユニーク性を決定する基準。関数、プロパティ名、部分オブジェクト、またはプロパティ-値配列を使用できます。

#### 戻り値

(`T[]`): 指定された基準に基づいて重複を削除したユニークな値を含む新しい配列を返します。

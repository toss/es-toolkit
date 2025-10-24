# unionWith (Lodash互換)

::: warning `es-toolkit`の[unionWith](../../array/unionWith.md)を使用してください

この`unionWith`関数は複雑な処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[unionWith](../../array/unionWith.md)を使用してください。

:::

複数の配列をマージし、比較関数を使用してユニークな値のみを残します。

```typescript
const result = unionWith(...arrays, comparator);
```

## 参照

### `unionWith(...arrays, comparator)`

複数の配列をマージし、カスタム比較関数を使用して重複を削除し、ユニークな値のみを含む新しい配列を作成したい場合は`unionWith`を使用してください。各値が最初に出現する順序を保持します。

```typescript
import { unionWith } from 'es-toolkit/compat';

// カスタム比較関数を使用
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];

unionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// 戻り値: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

// 単純な等価比較
unionWith([1, 2], [2, 3], (a, b) => a === b);
// 戻り値: [1, 2, 3]

// 文字列の長さで比較
unionWith(['ab', 'cd'], ['ef', 'gh', 'ab'], (a, b) => a.length === b.length);
// 戻り値: ['ab']
```

`null`または`undefined`配列は無視されます。

```typescript
import { unionWith } from 'es-toolkit/compat';

unionWith([1, 2], null, undefined, [3, 4], (a, b) => a === b);
// 戻り値: [1, 2, 3, 4]
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): マージする配列。
- `comparator` (`(a: T, b: T) => boolean`): 2つの値が等しいかどうかを判断する比較関数。

#### 戻り値

(`T[]`): 比較関数を使用して重複を削除したユニークな値を含む新しい配列を返します。

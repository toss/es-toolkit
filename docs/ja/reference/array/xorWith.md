# xorWith

与えられた比較関数を使用して、2つの配列のいずれか一方にのみ存在する要素で新しい配列を作成します。

```typescript
const result = xorWith(arr1, arr2, areElementsEqual);
```

## 参照

### `xorWith(arr1, arr2, areElementsEqual)`

複雑なオブジェクトや特別な比較条件で対称差集合を求めたい場合は `xorWith` を使用してください。ユーザー定義の等価性関数で要素を比較し、2つの配列のいずれか一方にのみ存在する要素で新しい配列を作成します。

```typescript
import { xorWith } from 'es-toolkit/array';

// オブジェクトのidで比較します。
xorWith(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  [
    { id: 2, name: 'Bobby' },
    { id: 3, name: 'Charlie' },
  ],
  (a, b) => a.id === b.id
);
// Returns: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// 大文字小文字を無視して比較します。
xorWith(['Apple', 'Banana'], ['APPLE', 'Cherry'], (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Banana', 'Cherry']
```

より複雑な比較も可能です。

```typescript
import { xorWith } from 'es-toolkit/array';

// 絶対値で比較します。
xorWith([-1, -2, 3], [1, 2, -4], (a, b) => Math.abs(a) === Math.abs(b));
// Returns: [3, -4]

// 深いオブジェクト比較を行います。
xorWith(
  [{ specs: { ram: 8, storage: 256 } }],
  [{ specs: { ram: 8, storage: 256 } }],
  (a, b) => a.specs.ram === b.specs.ram && a.specs.storage === b.specs.storage
);
// Returns: []
```

#### パラメータ

- `arr1` (`readonly T[]`): 比較する最初の配列です。
- `arr2` (`readonly T[]`): 比較する2番目の配列です。
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 2つの要素が等しいかどうかを判断する関数です。等しい場合は `true`、異なる場合は `false` を返す必要があります。

#### 戻り値

(`T[]`): ユーザー定義の等価性関数を基準に計算された対称差集合を表す新しい配列を返します。

# difference

最初の配列から2番目の配列にある要素を除いた新しい配列を返します。

```typescript
const result = difference(firstArr, secondArr);
```

## 参照

### `difference(firstArr, secondArr)`

2つの配列の差集合を求めたい場合は、`difference` を使用してください。最初の配列にのみ存在し、2番目の配列には存在しない要素で構成された新しい配列が返されます。

```typescript
import { difference } from 'es-toolkit/array';

// 数値配列の差集合を求めます。
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
difference(array1, array2);
// 戻り値: [1, 3, 5]
// 2と4は両方の配列に存在するため除外されます。

// 文字列配列の差集合を求めます。
const colors1 = ['red', 'blue', 'green'];
const colors2 = ['blue', 'yellow'];
difference(colors1, colors2);
// 戻り値: ['red', 'green']
```

空の配列との差集合は元の配列と同じです。

```typescript
import { difference } from 'es-toolkit/array';

difference([1, 2, 3], []); // [1, 2, 3]
difference([], [1, 2, 3]); // []
```

#### パラメータ

- `firstArr` (`T[]`): 差集合を求める基準配列。
- `secondArr` (`T[]`): 最初の配列から除外する要素を含む配列。

#### 戻り値

(`T[]`): 最初の配列にのみ存在し、2番目の配列には存在しない要素で構成された新しい配列。

## パフォーマンス比較

|            | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ---------- | ----------------------------------- | ----------------------------------- |
| es-toolkit | 90 バイト (92.4% 小さい)             | 9,317,227 回 (85% 速い)              |
| lodash-es  | 7,958 バイト                         | 5,030,861 回                         |

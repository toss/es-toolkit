# difference

2つの配列の差分を計算します。

この関数は2つの配列をパラメータとして受け取り、最初の配列にあるが2番目の配列にない要素を含む新しい配列を返します。
つまり、最初の配列から2番目の配列にある要素を除いた残りの要素で構成される配列を作成します。

## インターフェース

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

### パラメータ

- `firstArr` (`T[]`): 差分を計算する配列です。この配列が主な配列で、この配列の要素が比較されフィルタリングされます。
- `secondArr` (`T[]`): 最初の配列から除外する要素を含む配列です。この配列の各要素は最初の配列と比較され、一致する要素があれば結果から除外されます。

### 戻り値

(`T[]`): 最初の配列にはあるが2番目の配列にはない要素が含まれる新しい配列です。

## 例

```typescript
import { difference } from 'es-toolkit/array';

// 使用例：
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// 2と4は両方の配列に存在するため結果から除外され、result変数には[1, 3, 5]が割り当てられます。
```

## パフォーマンス比較

|            | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ---------- | ----------------------------------- | ----------------------------------- |
| es-toolkit | 90 bytes (92.4% smaller)            | 9,317,227 times (85% faster)        |
| lodash-es  | 7,958 bytes                         | 5,030,861 times                     |

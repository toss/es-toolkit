# differenceBy

提供された関数で要素をマッピングした後、2つの配列の差分を計算します。

この関数は2つの配列とマッパー関数を受け取り、マッパー関数で計算された結果を基準に、最初の配列にあるが2番目の配列にはない要素を含む新しい配列を返します。つまり、マッピングされた値が2番目の配列のマッピングされた値と一致する最初の配列の要素を除いた残りの要素で構成される配列を作成します。

## インターフェース

```typescript
function differenceBy<T, U>(firstArr: T[], secondArr: U[], mapper: (value: T | U) => unknown): T[];
```

### パラメータ

- `firstArr` (`T[]`): 差分を計算する配列です。この配列が主な配列で、この配列の要素が比較されフィルタリングされます。
- `secondArr` (`U[]`): 最初の配列から除外する要素を含む配列です。
- `mapper` (`(value: T | U) => unknown`): 2つの配列の要素をマッピングする関数です。この関数は2つの配列の各要素に適用され、マッピングされた値を基準に比較を行います。

### 戻り値

(`T[]`): 最初の配列にはあるが、マッピングされた値が2番目の配列のマッピングされた値と一致しない要素が含まれる新しい配列です。

## 例

```typescript
import { differenceBy } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = differenceBy(array1, array2, mapper);
// resultは[{ id: 1 }, { id: 3 }, { id: 5 }]になります。idが2の要素は両方の配列に存在するため、結果から除外されます。

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [2, 4];
const mapper = item => (typeof item === 'object' ? item.id : item);
const result = differenceBy(array1, array2, mapper);
// resultは[{ id: 1 }, { id: 3 }]になります。2はマッピング後に両方の配列に存在するため、結果から除外されます。
```

# differenceWith

引数として提供された比較関数に従って、2つの配列の差分を計算します。

この関数は2つの配列と比較関数を受け取ります。この比較関数を使用して要素が同じかどうかを比較し、最初の配列にあるが2番目の配列にはない要素を含む新しい配列を返します。

## インターフェース

```typescript
function differenceWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[];
```

### パラメータ

- `firstArr` (`T[]`): 差分を計算する配列です。この配列が主な配列で、この配列の要素が比較されフィルタリングされます。
- `secondArr` (`T[]`): 最初の配列から除外する要素を含む配列です。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が同じかどうかを決定する関数です。

### 戻り値

(`T[]`) 比較関数に基づいて、最初の配列にはあるが2番目の配列には存在しないと判断された要素を含む新しい配列です。

## 例

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// resultは[{ id: 1 }, { id: 3 }]になります。idが2の要素は同じと見なされ、結果から除外されます。
```

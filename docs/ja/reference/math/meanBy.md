# meanBy

各要素に `getValue` 関数を適用して配列の平均を計算します。

```typescript
const average = meanBy(items, getValue);
```

## 参照

### `meanBy(items, getValue)`

配列の各要素に関数を適用した結果の平均を求めたい場合は `meanBy` を使用してください。オブジェクト配列から特定のプロパティの平均を計算したり、各要素を変換した後で平均を求めたりするのに便利です。空の配列が与えられた場合は `NaN` を返します。

```typescript
import { meanBy } from 'es-toolkit/math';

// オブジェクト配列から特定のプロパティの平均を計算します
const people = [{ age: 23 }, { age: 25 }, { age: 27 }];
const averageAge = meanBy(people, person => person.age);
// averageAgeは25になります ((23 + 25 + 27) / 3 = 75 / 3 = 25)

// 文字列の長さの平均を計算します
const words = ['apple', 'banana', 'cherry'];
const averageLength = meanBy(words, word => word.length);
// averageLengthは約5.67になります ((5 + 6 + 6) / 3 ≈ 5.67)

// 空の配列の場合はNaNを返します
const emptyResult = meanBy([], x => x);
// emptyResultはNaNになります
```

#### パラメータ

- `items` (`readonly T[]`): 平均を計算する配列です。
- `getValue` (`(element: T) => number`): 各要素から数値を選択する関数です。

#### 戻り値

(`number`): `getValue` 関数を基準に、配列内のすべての値の平均を返します。空の配列の場合は `NaN` を返します。

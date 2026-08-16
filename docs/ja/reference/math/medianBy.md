# medianBy

各要素に `getValue` 関数を適用して配列の中央値を計算します。

```typescript
const middle = medianBy(items, getValue);
```

## 使用法

### `medianBy(items, getValue)`

配列の各要素に関数を適用した結果の中央値を求めたい場合は `medianBy` を使用してください。オブジェクト配列から特定のプロパティの中央値を計算したり、各要素を変換した後で中央値を求めたりするのに便利です。奇数個の要素を持つ配列の場合は正確に真ん中の値を、偶数個の要素を持つ配列の場合は真ん中の2つの値の平均を返します。空の配列が与えられた場合は `NaN` を返します。

```typescript
import { medianBy } from 'es-toolkit/math';

// オブジェクト配列から特定のプロパティの中央値を計算します(奇数個)
const people = [{ age: 23 }, { age: 25 }, { age: 27 }, { age: 29 }, { age: 31 }];
const medianAge = medianBy(people, person => person.age);
// medianAgeは27になります (ソートされたages [23, 25, 27, 29, 31] の真ん中の値)

// オブジェクト配列から特定のプロパティの中央値を計算します(偶数個)
const scores = [{ score: 80 }, { score: 90 }, { score: 85 }, { score: 95 }];
const medianScore = medianBy(scores, item => item.score);
// medianScoreは87.5になります (ソートされたscores [80, 85, 90, 95] で (85 + 90) / 2)

// 文字列の長さの中央値を計算します
const words = ['cat', 'elephant', 'dog', 'butterfly', 'ant'];
const medianLength = medianBy(words, word => word.length);
// medianLengthは3になります (lengths [3, 8, 3, 9, 3] をソートすると [3, 3, 3, 8, 9] で真ん中の値)

// 空の配列の場合はNaNを返します
const emptyResult = medianBy([], x => x);
// emptyResultはNaNになります
```

#### パラメータ

- `items` (`readonly T[]`): 中央値を計算する配列です。
- `getValue` (`(element: T) => number`): 各要素から数値を選択する関数です。

#### 戻り値

(`number`): `getValue` 関数を基準に、配列内のすべての値の中央値を返します。空の配列の場合は `NaN` を返します。

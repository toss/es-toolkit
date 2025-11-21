# sampleSize

配列から指定された個数だけ無作為に選択された要素で構成される新しい配列を返します。

```typescript
const sampled = sampleSize(array, size);
```

## 使用法

### `sampleSize(array, size)`

配列から複数の要素を無作為にサンプリングしたい場合は `sampleSize` を使用してください。Floydのアルゴリズムを使用して効率的に重複のないランダムサンプルを生成します。アンケート調査でサンプルを抽出したり、ゲームで複数のアイテムを無作為に選択するときに便利です。

```typescript
import { sampleSize } from 'es-toolkit/array';

// 数値配列から3つを無作為に選択します。
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNumbers = sampleSize(numbers, 3);
// Returns: [2, 7, 9] (例、実際には無作為)

// 文字列配列から2つを無作為に選択します。
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const randomFruits = sampleSize(fruits, 2);
// Returns: ['cherry', 'apple'] (例、実際には無作為)
```

様々なサイズでサンプリングできます。

```typescript
import { sampleSize } from 'es-toolkit/array';

const items = ['a', 'b', 'c', 'd', 'e'];

// 1つ選択
const single = sampleSize(items, 1);
// Returns: ['c'] (例)

// 配列全体のサイズと同じ数を選択(シャッフル効果)
const all = sampleSize(items, 5);
// Returns: ['b', 'd', 'a', 'e', 'c'] (例)

// 空の配列を選択
const none = sampleSize(items, 0);
// Returns: []
```

#### パラメータ

- `array` (`readonly T[]`): サンプリングする配列です。
- `size` (`number`): 選択する要素の個数です。

#### 戻り値

(`T[]`): 無作為に選択された要素で構成される新しい配列を返します。

#### エラー

`size` が配列の長さより大きい場合、エラーをスローします。

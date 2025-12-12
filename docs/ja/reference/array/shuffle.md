# shuffle

配列の要素の順序を無作為に入れ替えた新しい配列を返します。

```typescript
const shuffled = shuffle(arr);
```

## 使用法

### `shuffle(arr)`

配列の要素を無作為に入れ替えたい場合は `shuffle` を使用してください。Fisher-Yatesアルゴリズムを使用してすべての順列が等しい確率で現れるように完璧な無作為シャッフルを保証します。カードゲームでデッキをシャッフルしたり、クイズ問題の順序をランダム化したり、プレイリストをシャッフルするときに便利です。

```typescript
import { shuffle } from 'es-toolkit/array';

// 数値配列をシャッフルします。
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);
// Returns: [3, 1, 4, 5, 2] (例、実際には無作為)
console.log(numbers); // [1, 2, 3, 4, 5] (元の配列は変更されません)

// 文字列配列をシャッフルします。
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffledFruits = shuffle(fruits);
// Returns: ['cherry', 'apple', 'date', 'banana'] (例、実際には無作為)
```

様々な型の配列をシャッフルできます。

```typescript
import { shuffle } from 'es-toolkit/array';

// オブジェクト配列をシャッフルします。
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const shuffledUsers = shuffle(users);
// Returns: ユーザーオブジェクトが無作為な順序でシャッフルされた新しい配列

// 混合型配列をシャッフルします。
const mixed = [1, 'hello', true, { key: 'value' }];
const shuffledMixed = shuffle(mixed);
// Returns: 要素が無作為な順序でシャッフルされた新しい配列
```

#### パラメータ

- `arr` (`readonly T[]`): シャッフルする配列です。

#### 戻り値

(`T[]`): 要素が無作為な順序でシャッフルされた新しい配列を返します。元の配列は変更されません。

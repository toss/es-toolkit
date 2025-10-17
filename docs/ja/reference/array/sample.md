# sample

配列から無作為に選択された1つの要素を返します。

```typescript
const randomElement = sample(arr);
```

## 参照

### `sample(arr)`

配列から無作為に1つの要素を取得したい場合は `sample` を使用してください。ゲームでランダムアイテムを選択したり、テスト用データを無作為に取得したり、抽選を行うときに便利です。

```typescript
import { sample } from 'es-toolkit/array';

// 数値配列から無作為に1つを選択します。
const numbers = [1, 2, 3, 4, 5];
const randomNumber = sample(numbers);
// Returns: 1, 2, 3, 4, 5 のいずれか

// 文字列配列から無作為に1つを選択します。
const fruits = ['apple', 'banana', 'cherry', 'date'];
const randomFruit = sample(fruits);
// Returns: 'apple', 'banana', 'cherry', 'date' のいずれか

// オブジェクト配列から無作為に1つを選択します。
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];
const randomUser = sample(users);
// Returns: 3人のユーザーから無作為に1人
```

様々な型の配列でも使用できます。

```typescript
import { sample } from 'es-toolkit/array';

// 真偽値配列
const booleans = [true, false];
const randomBoolean = sample(booleans);
// Returns: true または false

// 混合型配列
const mixed = [1, 'hello', { key: 'value' }, [1, 2, 3]];
const randomItem = sample(mixed);
// Returns: 配列にある要素のいずれか
```

#### パラメータ

- `arr` (`readonly T[]`): 無作為に要素を選択する配列です。

#### 戻り値

(`T`): 配列から無作為に選択された要素です。

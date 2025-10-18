# isSubsetWith

ユーザー定義比較関数を基準に、一つの配列が他の配列の部分集合かどうかを確認します。

```typescript
const result = isSubsetWith(superset, subset, areItemsEqual);
```

## 参照

### `isSubsetWith(superset, subset, areItemsEqual)`

ユーザーが定義した比較関数で部分集合関係を確認したい場合は `isSubsetWith` を使用してください。オブジェクトを比較したり、特別な比較ロジックが必要な場合に便利です。

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// オブジェクトのidで部分集合を確認
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const targetUsers = [
  { id: 2, name: 'jane' },
  { id: 1, name: 'john' },
];
isSubsetWith(users, targetUsers, (a, b) => a.id === b.id);
// Returns: true

// 部分集合でない場合
const allUsers = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const someUsers = [{ id: 3, name: 'bob' }];
isSubsetWith(allUsers, someUsers, (a, b) => a.id === b.id);
// Returns: false
```

複雑な比較ロジックも使用できます。

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// 大文字小文字を区別しない文字列比較
const validNames = ['Alice', 'Bob', 'Charlie'];
const userNames = ['alice', 'BOB'];
isSubsetWith(validNames, userNames, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: true

// 範囲内の数値比較
const validRanges = [1, 2, 3, 4, 5];
const testNumbers = [1.1, 2.8];
isSubsetWith(validRanges, testNumbers, (a, b) => Math.abs(a - b) < 0.5);
// Returns: true (1.1は1と、2.8は3と十分に近い)
```

#### パラメータ

- `superset` (`readonly T[]`): 部分集合のすべての要素を含むことができる上位集合配列です。
- `subset` (`readonly T[]`): 上位集合に含まれているかを確認する部分集合配列です。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が等しいかを判断する関数です。等しい場合は `true`、異なる場合は `false` を返す必要があります。

#### 戻り値

(`boolean`): ユーザー定義比較関数を基準に、部分集合のすべての要素が上位集合に含まれている場合は `true`、そうでない場合は `false` を返します。

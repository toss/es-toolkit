# takeWhile

条件関数が真を返す間、配列の最初から要素を取得して新しい配列を作ります。

```typescript
const taken = takeWhile(arr, predicate);
```

## 使用法

### `takeWhile(arr, predicate)`

配列の最初から特定の条件を満たす要素だけが必要な場合は `takeWhile` を使用してください。条件を満たさない最初の要素に出会うと取得を停止します。

```typescript
import { takeWhile } from 'es-toolkit/array';

// 3より小さい要素だけを取得します。
takeWhile([1, 2, 3, 4], x => x < 3);
// Returns: [1, 2]

// 3より大きい要素は最初からないので空の配列を返します。
takeWhile([1, 2, 3, 4], x => x > 3);
// Returns: []
```

オブジェクト配列でも使用できます。

```typescript
import { takeWhile } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 },
];

// 30歳未満のユーザーだけを取得します。
takeWhile(users, user => user.age < 30);
// Returns: [{ name: 'Alice', age: 25 }]
```

#### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `predicate` (`(element: T, index: number, array: T[]) => boolean`): 各要素、インデックス、配列と共に呼び出される条件関数です。この関数が真を返す間、要素を取得します。

#### 戻り値

(`T[]`): 条件関数が真を返す間、最初から取得した要素を含む新しい配列を返します。

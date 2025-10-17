# partition

条件に従って配列を2つのグループに分けたタプルを返します。

```typescript
const [truthy, falsy] = partition(arr, isInTruthy);
```

## 参照

### `partition(arr, isInTruthy)`

配列の要素を特定の条件に従って2つのグループに分けたい場合は `partition` を使用してください。条件関数が `true` を返す要素と `false` を返す要素をそれぞれ異なる配列に分けます。

```typescript
import { partition } from 'es-toolkit/array';

// 数値配列を偶数と奇数に分けます。
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, x => x % 2 === 0);
// evens: [2, 4, 6]
// odds: [1, 3, 5]

// オブジェクト配列を特定の条件で分けます。
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];
const [activeUsers, inactiveUsers] = partition(users, user => user.active);
// activeUsers: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
// inactiveUsers: [{ name: 'Bob', active: false }]
```

空の配列の場合は2つの空の配列を返します。

```typescript
import { partition } from 'es-toolkit/array';

const [truthy, falsy] = partition([], x => x > 0);
// truthy: []
// falsy: []
```

#### パラメータ

- `arr` (`T[]`): 2つのグループに分ける配列です。
- `isInTruthy` (`(value: T) => boolean`): 各要素が最初の配列(truthy)に含まれるか、2番目の配列(falsy)に含まれるかを決定する条件関数です。

#### 戻り値

(`[truthy: T[], falsy: T[]]`): 2つの配列で構成されるタプルです。最初の配列は条件が `true` の要素、2番目の配列は条件が `false` の要素を含みます。

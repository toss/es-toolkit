# countBy

配列の要素を変換関数の結果値で分類し、個数を数えたオブジェクトを返します。

```typescript
const counted = countBy(arr, mapper);
```

## 使用法

### `countBy(arr, mapper)`

配列の要素を特定の基準で分類し、各グループの個数を数えたい場合は、`countBy` を使用してください。変換関数が返す値をキーとして要素をグループ化し、各グループに属する要素の個数を計算します。

```typescript
import { countBy } from 'es-toolkit/array';

// 数値を奇数/偶数で分類して個数を数えます。
countBy([1, 2, 3, 4, 5], item => (item % 2 === 0 ? 'even' : 'odd'));
// 戻り値: { odd: 3, even: 2 }
```

オブジェクト配列の特定のプロパティを基準に個数を数えることもできます。

```typescript
import { countBy } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
];

countBy(users, user => user.age);
// 戻り値: { '25': 2, '30': 2 }
```

#### パラメータ

- `arr` (`T[]`): 要素の個数を数える配列。
- `mapper` (`(item: T) => K`): 要素を分類する基準となる値を返す関数。

#### 戻り値

(`Record<K, number>`): 各分類基準別に要素がいくつあるかを示すオブジェクト。

# keyBy

キー生成関数を使用して配列要素をキーと値のペアのオブジェクトに変換した新しいオブジェクトを返します。

```typescript
const result = keyBy(arr, getKeyFromItem);
```

## 参照

### `keyBy(arr, getKeyFromItem)`

配列の各要素を素早く見つけられるようにキーでインデックス化されたオブジェクトを作成したい場合は `keyBy` を使用してください。各要素からユニークなキーを生成する関数を提供すると、そのキーを使って要素にアクセスできるオブジェクトを作成します。同じキーを生成する要素が複数ある場合は、最後の要素が使用されます。

```typescript
import { keyBy } from 'es-toolkit/array';

// オブジェクトのidプロパティをキーとして使用
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' }
];
keyBy(users, user => user.id);
// Returns: {
//   1: { id: 1, name: 'john' },
//   2: { id: 2, name: 'jane' },
//   3: { id: 3, name: 'bob' }
// }

// 文字列プロパティをキーとして使用
const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
];
keyBy(products, item => item.category);
// Returns: {
//   fruit: { category: 'fruit', name: 'banana' }, // 最後のfruit要素
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```

複雑なキー生成ロジックも使用できます。

```typescript
import { keyBy } from 'es-toolkit/array';

// 複数のプロパティを組み合わせてキーを作成
const orders = [
  { date: '2023-01-01', customerId: 1, amount: 100 },
  { date: '2023-01-01', customerId: 2, amount: 200 },
  { date: '2023-01-02', customerId: 1, amount: 150 }
];
keyBy(orders, order => `${order.date}-${order.customerId}`);
// Returns: {
//   '2023-01-01-1': { date: '2023-01-01', customerId: 1, amount: 100 },
//   '2023-01-01-2': { date: '2023-01-01', customerId: 2, amount: 200 },
//   '2023-01-02-1': { date: '2023-01-02', customerId: 1, amount: 150 }
// }
```

#### パラメータ

- `arr` (`readonly T[]`): オブジェクトに変換する配列。
- `getKeyFromItem` (`(item: T) => K`): 各要素からキーを生成する関数。

#### 戻り値

(`Record<K, T>`): 生成されたキーをプロパティ名とし、対応する要素を値とするオブジェクトを返します。同じキーを生成する要素が複数ある場合、最後の要素が値として使用されます。

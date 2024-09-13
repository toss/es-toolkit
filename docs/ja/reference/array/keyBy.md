# keyBy

配列の要素を簡単に見つけられるように、キーと値のペアからなるオブジェクトに変換します。

この関数は、パラメータとして配列と各要素からキーを生成する関数を受け取ります。
キーは関数で生成されたキーであり、値はそのキーを生成した要素であるオブジェクトを返します。
同じキーを生成する要素が複数ある場合、その中で最後の要素が値として使用されます。

## インターフェース

```typescript
function keyBy<T, K extends PropertyKey>(arr: T[], getKeyFromItem: (item: T) => K): Record<K, T>;
```

### パラメータ

- `arr` (`T[]`): マッピングする配列。
- `getKeyFromItem` (`(item: T) => K`): 要素からキーを生成する関数。

### 戻り値

(`Record<K, T>`) キーと対応する配列要素がマッピングされたオブジェクトを返します。

## 例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = keyBy(array, item => item.category);
// 結果:
// {
//   fruit: { category: 'fruit', name: 'banana' },
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```

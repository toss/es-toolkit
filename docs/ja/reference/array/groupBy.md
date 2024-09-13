# groupBy

与えられたキー生成関数に従って配列の要素を分類します。

この関数は、配列と各要素からキーを生成する関数をパラメータとして受け取ります。
キーは関数で生成されたキーであり、値はそのキーを共有する要素をグループ化した配列であるオブジェクトを返します。

## インターフェース

```typescript
function groupBy<T, K extends PropertyKey>(arr: T[], getKeyFromItem: (item: T) => K): Record<K, T[]>;
```

### パラメータ

- `arr` (`T[]`): 要素を分類する配列。
- `getKeyFromItem` (`(item: T) => K`): 要素からキーを生成する関数。

### 戻り値

(`Record<K, T[]>`): キーに従って要素が分類されたオブジェクトを返します。

## 例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = groupBy(array, item => item.category);
// 結果:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```

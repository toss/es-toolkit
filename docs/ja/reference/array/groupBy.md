# groupBy

与えられたキー生成関数またはプロパティキーに従って配列の要素を分類します。

この関数は、配列と各要素からキーを生成する関数、またはプロパティキー文字列をパラメータとして受け取ります。
キーは関数で生成されたキーまたはプロパティキーであり、値はそのキーを共有する要素をグループ化した配列であるオブジェクトを返します。

## インターフェース

```typescript
function groupBy<T, K extends PropertyKey>(arr: readonly T[], keyOrFn: ((item: T) => K) | keyof T): Record<K, T[]>;
```

### パラメータ

- `arr` (`readonly T[]`): 要素を分類する配列。
- `keyOrFn` (`((item: T) => K) | keyof T`): 要素からキーを生成する関数、またはグループ化するプロパティのキー。

### 戻り値

(`Record<K, T[]>`): キーに従って要素が分類されたオブジェクトを返します。

## 例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// キー生成関数を使用する場合:
const result1 = groupBy(array, item => item.category);

// プロパティキーを使用する場合:
const result2 = groupBy(array, 'category');

// どちらも同じ結果になります:
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

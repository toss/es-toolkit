# orderBy

複数のプロパティとそれぞれの順序方向に基づいてオブジェクトの配列をソートします。

与えられた条件 `criteria` と指定された順序方向に従って、オブジェクトの配列をソートします。

- 条件がプロパティ名の場合、対応するプロパティの値に基づいてソートします。
- 条件が関数の場合、関数が返す値に基づいてソートします。

配列は指定された順序に従って昇順（`asc`）または降順（`desc`）でソートされます。
条件に基づいて2つの要素の値が等しい場合、次の条件でソートします。
順序の数が条件の数より少ない場合、残りは最後の順序でソートされます。

## シグネチャ

```typescript
function orderBy<T extends object>(
  arr: T[],
  criteria: Array<((item: T) => unknown) | keyof T>,
  orders: Array<'asc' | 'desc'>
): T[];
```

### パラメータ

- `arr` (`T[]`): ソートするオブジェクトの配列。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): ソートの基準。オブジェクトのプロパティ名または関数を使用できます。
- `orders` (`Array<'asc' | 'desc'>`): 各キーに対するソート方向の配列（'asc'は昇順、'desc'は降順）。

### 戻り値

(`T[]`) ソートされた配列。

## 例

```typescript
// 'user'を昇順、'age'を降順でオブジェクトの配列をソートする。
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// result will be:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```

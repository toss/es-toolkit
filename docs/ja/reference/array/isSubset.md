# isSubset

一つの配列が他の配列の部分集合かどうかを確認します。

```typescript
const result = isSubset(superset, subset);
```

## 参照

### `isSubset(superset, subset)`

一つの配列のすべての要素が他の配列に含まれているかを確認したい場合は `isSubset` を使用してください。部分集合関係を確認する際や、権限、機能、タグなどが許可された範囲内にあるかを検査する際に便利です。

```typescript
import { isSubset } from 'es-toolkit/array';

// 数値配列で部分集合を確認
const numbers = [1, 2, 3, 4, 5];
const subset = [2, 3, 4];
isSubset(numbers, subset);
// Returns: true

// 文字列配列で部分集合を確認
const permissions = ['read', 'write', 'delete', 'admin'];
const userPermissions = ['read', 'write'];
isSubset(permissions, userPermissions);
// Returns: true

// 部分集合でない場合
const colors = ['red', 'blue', 'green'];
const invalidColors = ['red', 'yellow'];
isSubset(colors, invalidColors);
// Returns: false
```

特別なケースも正しく処理します。

```typescript
import { isSubset } from 'es-toolkit/array';

// 空の配列は常に部分集合です。
const anyArray = [1, 2, 3];
const emptyArray: number[] = [];
isSubset(anyArray, emptyArray);
// Returns: true

// 同じ配列は自分自身の部分集合です。
const same = ['a', 'b', 'c'];
isSubset(same, same);
// Returns: true

// 重複要素があっても正常に動作します。
const withDuplicates = [1, 2, 2, 3];
const duplicateSubset = [2, 2];
isSubset(withDuplicates, duplicateSubset);
// Returns: true
```

#### パラメータ

- `superset` (`readonly T[]`): 部分集合のすべての要素を含むことができる上位集合配列です。
- `subset` (`readonly T[]`): 上位集合に含まれているかを確認する部分集合配列です。

#### 戻り値

(`boolean`): 部分集合のすべての要素が上位集合に含まれている場合は `true`、そうでない場合は `false` を返します。

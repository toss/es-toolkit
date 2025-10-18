# findIndex（Lodash 互換性）

::: warning `Array.prototype.findIndex` を使用してください

この `findIndex` 関数は、さまざまな条件形式の処理や `fromIndex` 処理などの追加機能により、動作が遅くなります。

代わりに、より高速で現代的な `Array.prototype.findIndex` を使用してください。

:::

配列内で条件に一致する最初の要素のインデックスを検索します。

```typescript
const index = findIndex(arr, doesMatch, fromIndex);
```

## 参照

### `findIndex(arr, doesMatch, fromIndex)`

配列内で特定の条件に一致する最初の要素の位置を見つけたい場合は `findIndex` を使用してください。さまざまな方法で条件を指定できます。条件に一致する要素がない場合は `-1` を返します。

条件を関数として指定すると、各要素に対して関数を実行し、true を返す最初の要素のインデックスを返します。

```typescript
import { findIndex } from 'es-toolkit/compat';

const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true },
  { id: 3, name: 'Charlie', active: true },
];

// 関数で条件を指定
findIndex(users, user => user.active);
// Returns: 1
```

条件を部分オブジェクトとして指定すると、それらのプロパティが一致する最初の要素のインデックスを返します。

```typescript
import { findIndex } from 'es-toolkit/compat';

// 部分オブジェクトで条件を指定
findIndex(users, { name: 'Bob', active: true });
// Returns: 1
```

条件をプロパティ名と値の配列として指定すると、そのプロパティがその値と一致する最初の要素のインデックスを返します。

```typescript
import { findIndex } from 'es-toolkit/compat';

// [プロパティ名, 値] 配列で条件を指定
findIndex(users, ['active', true]);
// Returns: 1
```

プロパティ名のみを指定すると、そのプロパティが真と評価される最初の要素のインデックスを返します。

```typescript
import { findIndex } from 'es-toolkit/compat';

// プロパティ名で条件を指定
findIndex(users, 'active');
// Returns: 1
```

`fromIndex` を指定すると、そのインデックスから検索を開始します。負の値を使用すると、配列の末尾から計算されます。

```typescript
import { findIndex } from 'es-toolkit/compat';

// インデックス 2 から検索開始
findIndex(users, user => user.active, 2);
// Returns: 2

// 配列の末尾から2番目から検索
findIndex(users, user => user.active, -2);
// Returns: 1
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { findIndex } from 'es-toolkit/compat';

findIndex(null, user => user.active); // -1
findIndex(undefined, 'active'); // -1
```

#### パラメータ

- `arr` (`ArrayLike<T> | null | undefined`): 検索する配列です。
- `doesMatch` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, オプション): 一致条件です。関数、部分オブジェクト、キーと値のペア、またはプロパティ名を指定できます。
- `fromIndex` (`number`, オプション): 検索を開始するインデックスです。デフォルトは `0` です。

#### 戻り値

(`number`): 条件に一致する最初の要素のインデックスを返します。一致する要素がない場合は `-1` を返します。

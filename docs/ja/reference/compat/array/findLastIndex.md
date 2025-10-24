# findLastIndex (Lodash 互換性)

::: warning `Array.prototype.findLastIndex`を使用してください

この`findLastIndex`関数は、`null`や`undefined`の処理、部分オブジェクトのマッチング、プロパティ名のマッチングなどの追加機能により、動作が遅くなります。

代わりに、より高速で現代的な`Array.prototype.findLastIndex`を使用してください。

:::

配列で条件を満たす最後の要素のインデックスを見つけます。

```typescript
const lastIndex = findLastIndex(array, predicate, fromIndex);
```

## 参照

### `findLastIndex(array, predicate, fromIndex)`

配列の末尾から開始して、与えられた条件に一致する最初の要素のインデックスを見つけたい場合は`findLastIndex`を使用してください。条件を満たす要素がない場合は`-1`を返します。

この関数は様々な方法で条件を指定できます。関数を渡すと各要素に対して関数を実行し、部分オブジェクトを渡すと要素がそのプロパティを持っているかを確認します。配列形式のキー値ペアを渡すと特定のプロパティが与えられた値と一致するかを確認し、文字列を渡すとそのプロパティが真と評価される値かを確認します。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

// 関数を使用して条件を指定します
findLastIndex(users, o => o.user === 'pebbles');
// Returns: 2

// 部分オブジェクトを使用して一致する要素を見つけます
findLastIndex(users, { user: 'barney', active: true });
// Returns: 0

// プロパティ-値ペアを使用して一致する要素を見つけます
findLastIndex(users, ['active', false]);
// Returns: 2

// プロパティ名を使用して真と評価される値を持つ要素を見つけます
findLastIndex(users, 'active');
// Returns: 0
```

検索開始位置を指定することもできます。`fromIndex`が負の場合は配列の末尾から計算します。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// インデックス3から逆方向に検索します
findLastIndex(numbers, n => n < 4, 2);
// Returns: 2

// 負のインデックスを使用すると末尾から計算します
findLastIndex(numbers, n => n > 2, -2);
// Returns: 3
```

`null`または`undefined`は空の配列として処理されます。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

findLastIndex(null, n => n > 0); // -1
findLastIndex(undefined, n => n > 0); // -1
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検索する配列です。
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, オプション): 各要素をテストする条件です。関数、部分オブジェクト、プロパティ-値ペア、またはプロパティ名を使用できます。デフォルトは恒等関数です。
- `fromIndex` (`number`, オプション): 検索を開始するインデックスです。負の場合は配列の末尾から計算します。デフォルトは`array.length - 1`です。

#### 戻り値

(`number`): 条件を満たす最後の要素のインデックスを返します。条件を満たす要素がない場合は`-1`を返します。

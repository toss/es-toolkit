# sum (Lodash 互換性)

::: warning es-toolkitの[sum](../../math/sum.md)を使用してください

この`sum`関数は型変換とnull/undefined処理により動作が遅いです。

代わりにより高速で現代的な`es-toolkit`の[sum](../../math/sum.md)を使用してください。

:::

配列のすべての値を足します。

```typescript
const total = sum(array);
```

## 参照

### `sum(array)`

配列内のすべての数値を足して合計を求めます。

```typescript
import { sum } from 'es-toolkit/compat';

// 数値配列
sum([1, 2, 3]);
// Returns: 6

sum([1.5, 2.5, 3]);
// Returns: 7

// 空配列
sum([]);
// Returns: 0
```

BigIntと文字列も処理します。

```typescript
import { sum } from 'es-toolkit/compat';

// BigInt配列
sum([1n, 2n, 3n]);
// Returns: 6n

// 文字列配列（連結される）
sum(['1', '2']);
// Returns: '12'
```

無効な値は無視します。

```typescript
import { sum } from 'es-toolkit/compat';

sum([1, undefined, 2]);
// Returns: 3 (undefinedを無視)

sum(null);
// Returns: 0

sum(undefined);
// Returns: 0
```

#### パラメータ

- `array` (`ArrayLike<any> | null | undefined`): 足す値が含まれる配列です。

#### 戻り値

(`number`): すべての値を足した合計を返します。

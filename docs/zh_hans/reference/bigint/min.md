# min (`BigInt`)

返回数组中最小的 `BigInt`。

```typescript
const smallest = min(numbers);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `min(nums)`

当您想从多个 `BigInt` 中取出最小值时,请使用 `min`。`Math.min` 完全无法接受 `BigInt`,所以只能这样比较它们。

```typescript
import { min } from 'es-toolkit/bigint';

const smallest = min([1n, 5n, 3n]);
console.log(smallest); // 1n

// 对负数同样适用
console.log(min([-5n, -1n, -3n])); // -5n
```

由于 `BigInt` 是精确比较的,那些用 `number` 会舍入成同一个值的数字仍然可以区分。

```typescript
import { min } from 'es-toolkit/bigint';

// 作为 `number`,这两个值都是 9007199254740992
console.log(min([9007199254740993n, 9007199254740992n])); // 9007199254740992n
```

没有任何 `BigInt` 可以表示“没有最小值”,因为 `BigInt` 既没有 `NaN` 也没有 `Infinity`,所以空数组会抛出错误,而不是返回一个占位值。

```typescript
import { min } from 'es-toolkit/bigint';

min([]); // RangeError: Cannot find the minimum of an empty array.
```

#### 参数

- `nums` (`readonly bigint[]`): 要搜索的 `BigInt` 数组。

#### 返回值

(`bigint`): 返回数组中最小的 `BigInt`。

#### 错误

如果数组为空,则抛出 `RangeError`。

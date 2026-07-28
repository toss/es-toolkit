# rangeRight (`BigInt`)

返回与 [range](./range.md) 相同的 `BigInt`,但按降序排列。

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end);
const numbers = rangeRight(start, end, step);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `rangeRight(end)`

使用带一个参数的 `rangeRight`,从刚好小于结束值的位置递减计数到 `0n`。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(4n)); // [3n, 2n, 1n, 0n]
console.log(rangeRight(0n)); // []
```

#### 参数

- `end` (`bigint`): 范围的结束值(不包括)。

#### 返回值

(`bigint[]`): 返回从刚好小于 `end` 的值递减到 `0n` 的 `BigInt` 数组。

### `rangeRight(start, end)`

使用带两个参数的 `rangeRight`,递减计数到 `0n` 以外的起始值。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(2n, 5n)); // [4n, 3n, 2n]
console.log(rangeRight(-3n, 0n)); // [-1n, -2n, -3n]
```

#### 参数

- `start` (`bigint`): 范围的起始值(包括)。
- `end` (`bigint`): 范围的结束值(不包括)。

#### 返回值

(`bigint[]`): 返回从刚好小于 `end` 的值递减到 `start` 的 `BigInt` 数组。

### `rangeRight(start, end, step)`

使用带三个参数的 `rangeRight`,以 `1n` 以外的步长计数。其值与使用相同参数的 `range` 完全一致,只是顺序相反。

```typescript
import { range, rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 10n, 2n)); // [8n, 6n, 4n, 2n, 0n]
console.log(rangeRight(5n, 0n, -1n)); // [1n, 2n, 3n, 4n, 5n]

// 始终是使用相同参数的 range 的逆序
console.log(rangeRight(0n, 10n, 3n)); // [9n, 6n, 3n, 0n]
console.log(range(0n, 10n, 3n)); // [0n, 3n, 6n, 9n]
```

如果步长的方向背离结束值,则没有可生成的内容,您会得到一个空数组。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 5n, -1n)); // []
```

#### 参数

- `start` (`bigint`): 范围的起始值(包括)。
- `end` (`bigint`): 范围的结束值(不包括)。
- `step` (`bigint`, 可选): 计数的步长。默认为 `1n`。

#### 返回值

(`bigint[]`): 按降序返回 `range(start, end, step)` 的值。

#### 错误

如果 `step` 为 `0n`,则抛出错误。

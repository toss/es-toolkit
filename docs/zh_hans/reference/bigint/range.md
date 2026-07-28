# range (`BigInt`)

返回一个 `BigInt` 数组,从起始值开始计数,直到但不包括结束值。

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `range(end)`

使用带一个参数的 `range`,从 `0n` 开始计数,直到但不包括结束值。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(4n)); // [0n, 1n, 2n, 3n]
console.log(range(0n)); // []
```

#### 参数

- `end` (`bigint`): 范围的结束值(不包括)。

#### 返回值

(`bigint[]`): 返回从 `0n` 到但不包括 `end` 的 `BigInt` 数组。

### `range(start, end)`

使用带两个参数的 `range`,从指定的起始值而不是 `0n` 开始计数。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(2n, 5n)); // [2n, 3n, 4n]
console.log(range(-3n, 0n)); // [-3n, -2n, -1n]

// 起始值和结束值相同时没有可计数的内容
console.log(range(3n, 3n)); // []
```

由于 `BigInt` 在任何大小下都保持精确,您可以构建超过 `Number.MAX_SAFE_INTEGER` 的范围,而不会出现值悄悄重合的情况。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(9007199254740993n, 9007199254740996n));
// [9007199254740993n, 9007199254740994n, 9007199254740995n]
```

#### 参数

- `start` (`bigint`): 范围的起始值(包括)。
- `end` (`bigint`): 范围的结束值(不包括)。

#### 返回值

(`bigint[]`): 返回从 `start` 到但不包括 `end` 的 `BigInt` 数组。

### `range(start, end, step)`

使用带三个参数的 `range`,以 `1n` 以外的步长计数。负的步长表示递减计数。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 10n, 2n)); // [0n, 2n, 4n, 6n, 8n]
console.log(range(5n, 0n, -1n)); // [5n, 4n, 3n, 2n, 1n]
console.log(range(5n, 0n, -2n)); // [5n, 3n, 1n]
```

如果步长的方向背离结束值,则没有可生成的内容,您会得到一个空数组。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 5n, -1n)); // []
console.log(range(5n, 0n, 1n)); // []
```

#### 参数

- `start` (`bigint`): 范围的起始值(包括)。
- `end` (`bigint`): 范围的结束值(不包括)。
- `step` (`bigint`, 可选): 计数的步长。默认为 `1n`。

#### 返回值

(`bigint[]`): 返回从 `start` 到但不包括 `end`、以 `step` 为步长计数的 `BigInt` 数组。

#### 错误

如果 `step` 为 `0n`,则抛出错误。

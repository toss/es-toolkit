# chunk

将一个数组分割成指定长度的多个子数组。

该函数接受一个输入数组，并将其分割成多个指定长度的子数组。

如果输入数组无法均匀分割，则最后一个子数组将包含剩余的元素。

## 签名

```typescript
function chunk<T>(arr: T[], size: number): T[][];
```

### 参数

- `arr` (`T[]`): 要分割成小数组的数组。
- `size` (`number`): 每个小数组的长度。必须是正整数。

### 返回值

(`T[][]`) 一个二维数组，其中每个子数组的最大长度为 `size`。

### 抛出异常

如果 `size` 不是正整数，则抛出错误。

## 示例

```typescript
import { chunk } from 'es-toolkit/array';

// 将一组数字分割成长度为2的子数组
chunk([1, 2, 3, 4, 5], 2);
// 返回: [[1, 2], [3, 4], [5]]

// 将一组字符串分割成长度为3的子数组
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// 返回: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

## 演示

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `chunk` 以实现与 lodash 的完全兼容。

- `chunk` 当给定的 `size` 小于 1 时不抛出异常。
- `chunk` 接受分数值，这些值将被向下舍入到最近的整数。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```

## 性能对比

|                   | [包大小](../../bundle-size.md) | [性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------- |
| es-toolkit        | 238 字节 (小 92.4%)            | 9,338,821 次 (慢 11%)        |
| es-toolkit/compat | 307 字节 (小 90.2%)            | 9,892,157 次 (慢 5%)         |
| lodash-es         | 3,153 字节                     | 10,523,270 次                |

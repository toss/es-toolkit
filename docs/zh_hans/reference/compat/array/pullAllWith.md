# pullAllWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用提供的比较函数来确定要移除的元素，并从数组中移除并返回。

它使用比较函数（`comparator`）来比较原始数组（`array`）中的元素和比较数组（`values`）中的元素，并从原始数组中移除比较结果为 `true` 的元素。

## 接口

```typescript
function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[];
```

### 参数

- `array` (`T[]`): 要修改的数组。
- `values` (`T[]`): 要从数组中移除的值。
- `comparator` (`(a: T, b: T) => boolean`): 用于比较 `array` 中的元素和 `values` 中的元素的函数。如果两个元素相等，应返回 `true`。

### 返回值

(`T[]`): 移除了指定值的数组。

## 示例

```typescript
import { pullAllWith } from 'es-toolkit/array';

const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

const removed = pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => JSON.stringify(a) === JSON.stringify(b));

console.log(removed); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
console.log(array); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

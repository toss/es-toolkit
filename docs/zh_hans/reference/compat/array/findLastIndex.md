# findLastIndex

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

与 `findIndex` 类似，`findLastIndex` 返回数组中符合条件的第一个元素的索引，但它从数组的右侧开始搜索。

您可以通过以下几种方式指定条件：

- **谓词函数**：如果提供一个谓词函数，该函数将应用于每一项。返回 `true` 的第一个项将被选中。
- **部分对象**：如果提供一个部分对象，该函数将返回第一个匹配部分对象属性的项。
- **属性-值对**：如果提供一个属性-值对，该函数将返回第一个匹配该属性和值的项。
- **属性名称**：如果提供一个属性名称，该函数将返回第一个指定属性具有真值的项。

## 签名

```typescript
function findLastIndex<T>(
  arr: T[],
  doesMatch: (item: T, index: number, arr: T[]) => unknown,
  fromIndex?: number
): number;
function findLastIndex<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): number;
function findLastIndex<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): number;
function findLastIndex<T>(arr: T[], doesMatch: string, fromIndex?: number): number;
```

### 参数

- `arr` (`T[]`): 要搜索的数组。

- `doesMatch`:

  - **谓词函数** (`(item: T, index: number, arr: T[]) => unknown`): 一个函数，接受项、其索引和数组，如果项符合条件则返回真值。
  - **部分对象** (`Partial<T>`): 指定要匹配的属性的部分对象。
  - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值。
  - **属性名称** (`string`): 要检查其真值的属性名称。

- `fromIndex` (`number`): 搜索开始的位置。默认值为数组的最后一个元素的索引（`arr.length - 1`）。

### 返回

(`number`): 第一个具有指定属性值的项的索引，如果没有找到匹配项，则为 `-1`。

## 示例

```typescript
import { findLastIndex } from 'es-toolkit/compat';

// 使用谓词函数
const items = [1, 2, 3, 4, 5];
const result = findLastIndex(items, item => item > 3);
console.log(result); // 4

// 使用部分对象
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, { name: 'Bob' });
console.log(result); // 1

// 使用属性-值对
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, ['name', 'Alice']);
console.log(result); // 0

// 使用属性名称
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, 'name');
console.log(result); // 1
```

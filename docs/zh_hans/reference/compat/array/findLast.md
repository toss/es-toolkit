# findLast

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::
查找数组或对象中最后一个符合指定条件的项。

您可以通过以下几种方式指定条件：

- **谓词函数**：如果提供一个谓词函数，该函数将应用于每一项。返回 `true` 的最后一个项将被选中。
- **部分对象**：如果提供一个部分对象，该函数将返回最后一个匹配部分对象属性的项。
- **属性-值对**：如果提供一个属性-值对，该函数将返回最后一个匹配该属性和值的项。
- **属性名称**：如果提供一个属性名称，该函数将返回最后一个指定属性具有真值的项。

## 签名

```typescript
function findLast<T>(
  arr: T[],
  doesMatch: (item: T, index: number, arr: T[]) => unknown,
  fromIndex?: number
): T | undefined;
function findLast<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): T | undefined;
function findLast<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): T | undefined;
function findLast<T>(arr: T[], doesMatch: PropertyKey, fromIndex?: number): T | undefined;

function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (item: T[keyof T], index: number, object: T) => unknown,
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: Partial<T[keyof T]>,
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: [keyof T[keyof T], unknown],
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: PropertyKey,
  fromIndex?: number
): T | undefined;
```

### 参数

- `arr` (`T[]`) 或 `object` (`T`): 要搜索的数组或对象。

::: info `arr` 可以是 `ArrayLike<T>`、`null` 或 `undefined`

为了确保与 lodash 的完全兼容性，`find` 函数会按照以下方式处理 `arr`：

- 如果 `arr` 是 `ArrayLike<T>`，它将使用 `Array.from(...)` 转换为数组。
- 如果 `arr` 是 `null` 或 `undefined`，它将被视为一个空数组。

:::

::: info `object` 可以是 `null` 或 `undefined`

为了确保与 lodash 的完全兼容性，`find` 函数会按照以下方式处理 `object`：

- 如果 `object` 是 `null` 或 `undefined`，它将被转换为一个空对象。

:::

- `doesMatch`:

  - 对于数组的 `find` 重载：

    - **谓词函数** (`(item: T, index: number, arr: T[]) => unknown`): 一个函数，接受项、其索引和数组，如果项符合条件则返回真值。
    - **部分对象** (`Partial<T>`): 指定要匹配的属性的部分对象。
    - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值。
    - **属性名称** (`PropertyKey`): 要检查其真值的属性名称。

  - 对于对象的 `find` 重载：
    - **谓词函数** (`(item: T[keyof T], index: number, object: T) => unknown`): 一个函数，接受项、其键和对象，如果项符合条件则返回真值。
    - **部分值** (`Partial<T[keyof T]>`): 用于与对象的值进行匹配的部分值。
    - **属性-值对** (`[keyof T[keyof T], unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值。
    - **属性名称** (`PropertyKey`): 要检查其真值的属性名称。

- `fromIndex` (`number`): 搜索开始的位置。默认为 `0`。

### 返回

(`T | undefined`): 第一个具有指定属性值的项，如果没有找到匹配项，则返回 `undefined`。

## 示例

### 数组

```typescript
import { findLast } from 'es-toolkit/compat';

// 使用谓词函数
const items = [1, 2, 3, 4, 5];
const result = findLast(items, item => item > 3);
console.log(result); // 5

// 使用部分对象
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// 使用属性-值对
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// 使用属性名称
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, 'name');
console.log(result); // { id: 2, name: 'Bob' }
```

### 对象

```typescript
import { findLast } from 'es-toolkit/compat';

// 使用谓词函数
const obj = { a: 1, b: 2, c: 3 };
const result = findLast(obj, item => item > 2);
console.log(result); // 3

// 使用部分对象
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = findLast(obj, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// 使用属性-值对
const items = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = findLast(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// 使用属性名称
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = findLast(obj, 'name');
console.log(result); // { id: 2, name: 'Bob' }
```

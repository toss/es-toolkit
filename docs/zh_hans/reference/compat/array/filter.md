# filter

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

返回满足提供条件的元素新数组。

条件可以通过多种方式指定：

- **谓词函数**: 对每个元素执行一个函数，选择满足条件的元素。
- **部分对象**: 选择与提供的对象部分匹配的元素。
- **属性-值对**: 选择指定键与给定值匹配的元素。
- **属性名称**: 选择存在指定属性名的元素。

## 签名

```typescript
function filter<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T[];
function filter<T>(arr: T[], doesMatch: Partial<T>): T[];
function filter<T>(arr: T[], doesMatch: [keyof T, unknown]): T[];
function filter<T>(arr: T[], doesMatch: string): T[];

function filter<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: string): T[];
```

### 参数

- `arr` (`T[]`) 或 `object` (`T`): 要迭代的数组或对象。

- `doesMatch`:

  - 对于数组的第一个 `filter` 重载：

    - **谓词函数** (`(item: T, index: number, arr: T[]) => unknown`): 一个检查元素是否满足条件的函数。
    - **部分对象** (`Partial<T>`): 用于检查元素的属性和值是否匹配的部分对象。
    - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值。
    - **属性名称** (`string`): 用于检查是否具有特定属性的属性名称。

  - 对于对象的 `filter` 重载：
    - **谓词函数** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): 一个函数，接收一个项、其键和对象，如果该项符合条件，则返回一个真值。
    - **部分值** (`Partial<T[keyof T]>`): 用于检查元素的属性和值是否匹配的部分对象。
    - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值。
    - **属性名称** (`string`): 用于检查是否具有特定属性的属性名称。

### 返回

(`T[]`): 满足条件的元素数组。如果没有，返回空数组。 (`[]`)

## 示例

### 数组

```typescript
import { filter } from 'es-toolkit/compat';

// 使用谓词函数
filter([1, 2, 3], n => n % 2 === 0);
// => [2]

// 使用部分对象
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// 使用属性-值对
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// 使用属性名称
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, age: 28 },
];
filter(arr, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### 对象

```typescript
import { filter } from 'es-toolkit/compat';

// 使用谓词函数
const obj = { a: 1, b: 2, c: 3 };
filter(obj, item => item > 2);
// => [3]

// 使用部分对象
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
};
filter(obj, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// 使用属性-值对
const obj = {
  alice: { id: 1, name: 'Alice' },
  bob: { id: 2, name: 'Bob' },
};
filter(obj, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// 使用属性名称
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
  c: { id: 3, age: 28 },
};
filter(obj, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

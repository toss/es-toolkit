# find

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查数组或对象的所有元素是否满足指定条件。

您可以通过以下几种方式指定条件：

- **检查函数**：如果提供一个检查函数，该函数将应用于每一项。所有项都返回 `true` 时，结果为 `true`。
- **部分对象**：如果提供一个部分对象，该函数将返回 `true`，如果所有项匹配部分对象的属性。
- **属性-值对**：如果提供一个属性-值对，该函数将返回 `true`，如果所有项匹配该属性和值。
- **属性名称**：如果提供一个属性名称，该函数将返回 `true`，如果所有项具有指定属性且其值为真。

## 签名

```typescript
function every<T>(arr: T[]): boolean;
function every<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): boolean;
function every<T>(arr: T[], doesMatch: Partial<T>): boolean;
function every<T>(arr: T[], doesMatch: [keyof T, unknown]): boolean;
function every<T>(arr: T[], doesMatch: string): boolean;

function every<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: string): boolean;
```

### 参数

- `arr` (`T[]`) 或 `object` (`T`): 要搜索的数组或对象。

- `doesMatch`:

  - 对于数组的 `every` 重载：

    - **检查函数** (`(item: T, index: number, arr: T[]) => unknown`): 一个函数，接受项、其索引和数组，如果所有项都符合条件则返回 `true`。
    - **部分对象** (`Partial<T>`): 指定要匹配的属性的部分对象，所有项必须匹配这些属性。
    - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值，所有项必须匹配该属性和值。
    - **属性名称** (`string`): 要检查其真值的属性名称，所有项必须具有该属性且其值为真。

  - 对于对象的 `every` 重载：
    - **检查函数** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): 一个函数，接受项、其键和对象，如果所有项都符合条件则返回 `true`。
    - **部分值** (`Partial<T[keyof T]>`): 用于与对象的值进行匹配的部分值，所有项必须匹配这些值。
    - **属性-值对** (`[keyof T, unknown]`): 一个数组，第一个元素是属性键，第二个元素是要匹配的值，所有项必须匹配该属性和值。
    - **属性名称** (`string`): 要检查其真值的属性名称，所有项必须具有该属性且其值为真。

### 返回

(`boolean`): 如果所有项都满足指定条件，则返回 `true`，否则返回 `false`。

## 示例

### 数组

```typescript
import { every } from 'es-toolkit/compat';

// 使用谓词函数
const items = [1, 2, 3, 4, 5];
const result = every(items, item => item > 0);
console.log(result); // true

// 使用部分对象
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, { name: 'Bob' });
console.log(result); // false

// 使用属性-值对
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, ['name', 'Alice']);
console.log(result); // false

// 使用属性名称
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, 'name');
console.log(result); // true
```

### 对象

```typescript
import { every } from 'es-toolkit/compat';

// 使用谓词函数
const obj = { a: 1, b: 2, c: 3 };
const result = every(obj, value => value > 0);
console.log(result); // true

// 使用部分对象
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, { name: 'Bob' });
console.log(result); // false

// 使用属性-值对
const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = every(obj, ['name', 'Alice']);
console.log(result); // false

// 使用属性名称
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, 'name');
console.log(result); // true
```

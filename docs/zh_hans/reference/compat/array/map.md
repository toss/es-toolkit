# map

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::
将数组的每个元素转换并返回一个新的数组。

每个元素的转换方式可以根据 [iteratee](../util/iteratee.md) 函数的行为来指定。

- **转换函数**: 对每个元素执行给定的函数，并将其转换为结果。
- **属性名称**: 从每个元素中选择指定的属性名称。
- **属性-值对**: 将每个元素转换为一个布尔值，指示元素的属性是否与给定值匹配。
- **部分对象**: 将每个元素转换为一个布尔值，指示元素是否与部分对象的属性和值匹配。

## 签名

```typescript
function map<T, U>(arr: T[], iteratee: (value: T, index: number, arr: T[]) => U): U[];
function map<T>(arr: T[], iteratee: Partial<T>): boolean[];
function map<T>(arr: T[], iteratee: [keyof T, unknown]): boolean[];
function map<T, K extends keyof T>(arr: T[], iteratee: K): Array<T[K]>;
function map<T>(arr: T[], iteratee?: null | undefined): T[];

function map<T extends object, U>(object: T, iteratee: (value: T[keyof T], key: string, object: T) => U): U[];
function map<T>(object: T, iteratee: Partial<T[keyof T]>): boolean[];
function map<T>(object: T, iteratee: [keyof T[keyof T], unknown]): boolean[];
function map<T, K extends keyof T[keyof T]>(object: T, iteratee: K): Array<T[keyof T][K]>;
function map<T extends object, U>(object: T, iteratee?: null | undefined): U[];
```

### 参数

- `arr` (`T[]`) 或 `object` (`T`): 要转换的数组或对象。

::: info `arr` 可以是 `ArrayLike<T>`，`null`，或 `undefined`

为了确保与 lodash 完全兼容，`map` 函数按以下方式处理 `arr`：

- 如果 `arr` 是 `ArrayLike<T>`，则使用 `Array.from(...)` 将其转换为数组。
- 如果 `arr` 是 `null` 或 `undefined`，则视为一个空数组。

:::

::: info `object` 可以是 `null` 或 `undefined`

为了确保与 lodash 完全兼容，`map` 函数按以下方式处理 `object`：

- 如果 `object` 是 `null` 或 `undefined`，则转换为空对象。

:::

- `iteratee`:

  - 对于数组：

    - **转换函数** (`(value: T, index: number, arr: T[]) => U`): 用于转换数组每个元素的函数。
    - **属性名称** (`keyof T`): 从每个元素中选择的属性名称。
    - **属性-值对** (`[keyof T, unknown]`): 一个元组，第一个元素是要匹配的属性，第二个是要匹配的值。
    - **部分对象** (`Partial<T>`): 指定要匹配的属性和值的部分对象。

  - 对于对象：

    - **转换函数** (`(item: T[keyof T], index: number, object: T) => unknown`): 用于转换对象每个值的函数。
    - **属性名称** (`keyof T[keyof T]`): 从对象每个值中选择的属性名称。
    - **属性-值对** (`[keyof T[keyof T], unknown]`): 一个元组，第一个元素是要匹配的属性，第二个是要匹配的值。
    - **部分对象** (`Partial<T[keyof T]>`): 指定要匹配的属性和值的部分对象。

### 返回

(`any[]`): 一个新的转换值数组。

### 示例

```typescript
// 使用转换函数
const array = [1, 2, 3];
map(array, value => value * 2); // => [2, 4, 6]

// 使用属性键作为迭代器
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, 'a'); // => [1, 2, 3]

// 使用对象作为迭代器
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, { a: 1 }); // => [true, false, false]

// 没有迭代器
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// 使用对象作为集合
const obj = { a: 1, b: 2, c: 3 };
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```

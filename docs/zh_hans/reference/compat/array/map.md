# map

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回基于提供的迭代器的转换值的新数组。

迭代器可以通过以下几种方式指定：

- **转换函数**：如果提供了转换函数，将对每个元素应用该函数。
- **属性键**：如果提供了属性键，函数将从每个元素中返回指定属性的值。
- **对象**：如果提供了对象，函数将使用 `isEqual` 比较每个元素与对象，并在它们匹配时返回 `true`。

## 签名

```typescript
function map<T, U>(collection: T[], iteratee: (value: T, index: number, collection: T[]) => U): U[];
function map<T, U>(collection: ArrayLike<T>, iteratee: (value: T, index: number, collection: ArrayLike<T>) => U): U[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: null | undefined): T[];
function map<T extends object, U>(collection: T, iteratee: (value: T[keyof T], key: string, collection: T) => U): U[];
function map<T, K extends keyof T>(collection: Record<string, T> | Record<number, T>, iteratee: K): Array<T[K]>;
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: string): any[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: object): boolean[];
```

### 参数

- `collection` (`T[]` | `ArrayLike<T>` | `Record<string, T>` | `Record<number, T>`): 要迭代的集合。

- `iteratee`:

  - **转换函数** (`(value: T, index: number, collection: T[]) => U`): 一个将每个元素转换的函数。
  - **属性键** (`K` | `string`): 要从每个元素中提取的属性的键。
  - **对象** (`object`): 要将每个元素与之比较的对象。

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

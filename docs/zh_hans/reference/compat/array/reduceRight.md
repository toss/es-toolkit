# reduceRight

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用迭代函数将数组或对象减少为单个值。[reduce](./reduce.md)与之不同的是，它是从右侧开始的。

`reduceRight()` 函数遍历数组中的每个元素或对象的值，并逐个应用一个特殊函数（称为“reducer”）。
此函数使用上一步的结果和当前元素来执行计算。
遍历所有元素后，该函数会给出一个最终结果。

当 `reduceRight()` 函数开始时，没有可用的上一步结果。
如果提供了初始值，则从该值开始。
如果没有，则使用数组的第一个元素或对象的第一个值，并从第二个元素或值开始计算。

## 签名

```typescript
function reduceRight<T, U>(
  collection: T[],
  iteratee: (accumulator: U, value: T, index: number, collection: T[]) => U,
  initialValue: U
): U;
function reduceRight<T>(collection: T[], iteratee: (accumulator: T, value: T, index: number, collection: T[]) => T): T;

function reduceRight<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;
function reduceRight<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

function reduceRight<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;
function reduceRight<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];
```

### 参数

- `collection` (`T[] | ArrayLike<T> | Record<PropertyKey, T>`): 要迭代的集合。
- `iteratee` (`(accumulator: U, value: T, index, collection) => any)`): 每次迭代时调用的函数。
- `initialValue` (`U`): 初始值。

### 返回值

(`any`): 返回累积值。

## 示例

```typescript
// Using a reducer function
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value, 0); // => 6

// Using a reducer function with initialValue
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value % 2 === 0, true); // => false

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
reduceRight(obj, (acc, value) => acc + value, 0); // => 6
```

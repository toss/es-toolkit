# transform

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

通过应用迭代函数将任何集合（数组或对象）转换为新的结果。

`transform()`函数遍历数组或对象中的每个属性，让您构建一个新的结果。
对于每个属性，它使用当前的累加器和属性值调用您的迭代函数。
您可以随意修改累加器，最终的累加器成为您的结果。

如果您不提供累加器，它将创建一个具有与原始对象相同原型的新数组或对象。
您还可以通过在迭代函数中返回`false`来提前停止转换。

## 签名

```typescript
function transform<T, U>(object?: T[], iteratee?: ((accumulator: U, value: T, index: number, object: T[]) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T extends object, U>(object?: T, iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T, U>(object?: T[] | T | null | undefined, iteratee?: ((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
```

### 参数

- `object` (`readonly T[] | T | null | undefined`): 要迭代的对象。
- `iteratee` (`((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null`): 每次迭代调用的函数。
- `accumulator` (`U | undefined | null`): 初始值。

### 返回值

(`U | undefined | null`): 返回累积的值。

## 示例

```typescript
// Transform an array
const array = [2, 3, 4];
transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5

// Transform an object
const obj = { 'a': 1, 'b': 2, 'c': 1 };
transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
```
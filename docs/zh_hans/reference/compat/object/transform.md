# transform

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，详情请见 [这里](../../../compatibility.md)。
:::

遍历对象的值，按照期望的形式累积并创建新对象。

如果不提供 `accumulator` 的初始值，将创建一个具有相同原型的新数组或对象。

当 `iteratee` 函数返回 `false` 时，将中断遍历。

## 接口

```typescript
export function transform<T, U>(
  object: readonly T[],
  iteratee?: (acc: U, curr: T, index: number, arr: readonly T[]) => void,
  accumulator?: U
): U;

export function transform<T, U>(
  object: Record<string, T>,
  iteratee?: (acc: U, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: U
): U;

export function transform<T extends object, U>(
  object: T,
  iteratee?: (acc: U, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: U
): U;
```

### 参数

- `object` (`readonly T[] | T`): 要处理的对象。
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown`): 每次处理时调用的函数。
- `accumulator` (`U`): 初始值。

### 返回值

(`U | undefined | null`): 返回累积的值。

## 示例

```typescript
// Transform an array
const array = [2, 3, 4];
transform(
  array,
  (acc, value) => {
    acc += value;
    return value % 2 === 0;
  },
  0
); // => 5

// Transform an object
const obj = { a: 1, b: 2, c: 1 };
transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
); // => { '1': ['a', 'c'], '2': ['b'] }
```

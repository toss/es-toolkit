# flatMapDepth

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

对数组或对象的每个元素应用迭代函数，然后将结果扁平化到指定的深度。

## 签名

```typescript
function flatMapDepth<T>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | null
    | undefined
): T[];

function flatMapDepth<T, R>(
  array: ArrayLike<T> | null | undefined,
  iteratee: (value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth<T extends object, R>(
  collection: T,
  iteratee: (value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth(collection: object | null | undefined, path: string, depth?: number): any[];

function flatMapDepth(collection: object | null | undefined, matches: object, depth?: number): boolean[];
```

### 参数

- `collection` (`Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | null | undefined`): 要迭代的数组或对象。
- `iteratee`: 每次迭代调用的函数。默认为 `identity`。
  - `(value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R`: 为每个元素调用的函数。
  - `(value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R`: 为每个属性调用的函数。
  - `string`: 要提取的属性路径。
  - `object`: 要匹配的对象。
- `depth` (`number`): 最大递归深度。默认为 `1`。

### 返回值

- (`T[] | R[] | any[] | boolean[]`): 返回新的扁平化数组。

## 示例

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 使用返回数组的函数的基本示例
function duplicate(n) {
  return [n, n];
}

flatMapDepth([1, 2], duplicate);
// => [1, 1, 2, 2]

// 指定深度
flatMapDepth(
  [
    [
      [1, 2],
      [3, 4],
    ],
  ],
  n => [n, n],
  2
);
// => [1, 1, 2, 2, 3, 3, 4, 4]

// 使用匹配对象
flatMapDepth({ a: 1, b: 2 }, { a: 1 });
// => [true, false]

// 使用属性路径
flatMapDepth({ a: { a: 1, b: 2 } }, 'a');
// => [1, 2]
```

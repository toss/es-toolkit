# invokeMap

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](mdc:../../../compatibility.md)。
:::

调用集合中每个元素在 `path` 位置的方法，并返回所有被调用方法的结果数组。任何额外的参数都会被传递给每个被调用的方法。如果 `path` 是一个函数，它会被调用并将 `this` 绑定到集合中的每个元素。

## 签名

```typescript
function invokeMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  path: PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R),
  ...args: unknown[]
): Array<R | undefined>;
```

### 参数

- `collection` (`T[] | Record<string, T> | null | undefined`): 要遍历的集合。
- `path` (`PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R)`): 要调用的方法的路径（字符串、数字、符号或这些的数组）或要调用的函数。
- `args` (`...unknown[]`): 调用每个方法时要传入的参数。

### 返回值

(`Array<R | undefined>`): 返回结果数组。如果找不到路径或方法调用结果为 `undefined`，则相应元素为 `undefined`。

## 示例

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 调用每个元素的方法
invokeMap(['a', 'b', 'c'], 'toUpperCase');
// => ['A', 'B', 'C']

// 使用参数调用方法
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[1, 5, 7], [1, 2, 3]]

// 调用对象中每个值的方法
invokeMap({ a: 1, b: 2, c: 3 }, 'toFixed', 1);
// => ['1.0', '2.0', '3.0']

// 使用函数替代方法名
invokeMap(
  ['a', 'b', 'c'],
  function (this: string, prefix: string, suffix: string) {
    return prefix + this.toUpperCase() + suffix;
  },
  '(',
  ')'
);
// => ['(A)', '(B)', '(C)']

invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```

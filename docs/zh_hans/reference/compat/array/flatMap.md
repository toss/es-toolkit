# flatMap

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

对集合中的每个元素执行 iteratee 函数，并将结果展平一层。iteratee 函数使用三个参数调用：(value, index, array)。

## 签名

```typescript
function flatMap<T, R>(
  collection: Array<T> | Record<string, T> | null | undefined,
  iteratee?: (
    value: T,
    index: number | string,
    collection: Array<T> | Record<string, T>
  ) => R | Array<R> | null | undefined
): Array<R>;
```

### 参数

- `collection`: 要迭代的集合。
- `iteratee`: 每次迭代调用的函数。默认为 `identity`。

### 返回值

(`Array`): 返回新的扁平化数组。

## 示例

```typescript
import { flatMap } from 'es-toolkit/compat';

// 使用返回数组的函数的基本示例
function duplicate(n) {
  return [n, n];
}

flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]

// 使用属性简写
const objects = [{ a: [1, 2] }, { a: [3, 4] }];
flatMap(objects, 'a');
// => [1, 2, 3, 4]

// 在对象上使用
flatMap({ a: 1, b: 2 }, n => [n, n]);
// => [1, 1, 2, 2]

// 处理嵌套数组
flatMap([[1], [2, [3]], 4]);
// => [1, 2, [3], 4]
```

# memoize

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，详情请见 [这里](../../../compatibility.md)。
:::

将函数结果进行记忆化(memoization)，以便使用相同参数再次调用时返回缓存的结果。

## 签名

```typescript
function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T>;
```

### 参数

- `func` (`T`): 需要记忆化的函数
- `resolver` (`(...args: Parameters<T>) => any`): 用于解析缓存键的函数。默认使用第一个参数作为键

### 返回值

(`MemoizedFunction<T>`): 返回记忆化后的函数。该函数具有与原始函数相同的签名，并且可以通过 `cache` 属性访问缓存。

## 示例

```typescript
import { memoize } from 'es-toolkit/compat';
import { values } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
const other = { c: 3, d: 4 };

const memoizedValues = memoize(values);
memoizedValues(object);
// => [1, 2]

memoizedValues(other);
// => [3, 4]

object.a = 2;
memoizedValues(object);
// => [1, 2] (缓存的结果)

// 修改缓存
memoizedValues.cache.set(object, ['a', 'b']);
memoizedValues(object);
// => ['a', 'b']
```

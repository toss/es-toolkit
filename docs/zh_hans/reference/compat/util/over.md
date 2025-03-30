# over

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，调用给定的函数并以数组形式返回它们的结果。

## 签名

```typescript
function over(...iteratees: Array<Iteratee | Iteratee[]>): (...args: any[]) => unknown[];
```

### 参数

- `iteratees` (`Array<Iteratee | Iteratee[]>`): 要调用的迭代器。
  - `Iteratee` 是 `((...args: any[]) => unknown) | symbol | number | string | object | null` 类型。

### 返回值

(`(...args: any[]) => unknown[]`): 返回新函数。

## 示例

```typescript
const func = over([Math.max, Math.min]);
const func2 = over(Math.max, Math.min);
func(1, 2, 3, 4);
// => [4, 1]
func2(1, 2, 3, 4);
// => [4, 1]

const func = over(['a', 'b']);
func({ a: 1, b: 2 });
// => [1, 2]

const func = over([{ a: 1 }, { b: 2 }]);
func({ a: 1, b: 2 });
// => [true, false]

const func = over([['a', 1], ['b', 2]]);
func({ a: 1, b: 2 });
// => [true, true]
```

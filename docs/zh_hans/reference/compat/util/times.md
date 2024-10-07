# times

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

调用函数 `n` 次，每次调用时将索引作为第一个参数传入，并返回一个由结果组成的数组。

## 签名

```typescript
function times<R = number>(n?: number, getValue?: (index: number) => R): R[];
```

### 参数

- `n` (`number`): 调用函数的次数。
- `iteratee` (`F extends (n: number) => any`): 每次迭代调用的函数。
  - 如果未提供，则返回一个从 `0` 到 `n-1` 的数组。

### 返回值

(`R[]`): 结果的数组。

## 示例

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
```

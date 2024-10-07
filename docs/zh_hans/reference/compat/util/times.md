# times

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

调用迭代器n次，返回每次调用结果的数组。

迭代器使用一个参数调用；（index）。

## 签名

```typescript
function times<F extends (n: number) => any>(n?: number, iteratee?: F): Array<ReturnType<F>>;
```

### 参数

- `n` (`number`): 调用迭代器的次数。
- `iteratee` (`F extends (n: number) => any`): 每次迭代调用的函数。默认为身份函数。

### 返回值

(`Array<ReturnType<F>>`): 返回结果的数组。

## 示例

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit') // => ['es-toolkit', 'es-toolkit']
```
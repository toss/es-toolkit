# nthArg

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，用于检索指定索引 `n` 处的参数。

如果 `n` 为负数，则返回从末尾开始的第 n 个参数。

## 签名

```typescript
function nthArg(n: number): (...args: any[]) => unknown;
```

### 参数

- `n` (`number`): 要检索的参数的索引。
  如果为负，则从参数列表的末尾开始计数。

### 返回值

(`(args: any[]) => unknown`): 一个新函数，返回指定索引处的参数。

## 示例

```typescript
const getSecondArg = nthArg(1);
const result = getSecondArg('a', 'b', 'c');
console.log(result); // => 'b'

const getLastArg = nthArg(-1);
const result = getLastArg('a', 'b', 'c');
console.log(result); // => 'c'
```

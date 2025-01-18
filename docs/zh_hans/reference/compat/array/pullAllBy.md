# pullAllBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用自定义迭代器从数组中删除所有指定的值。

此函数在原地更改`arr`。
如果您希望在不修改原始数组的情况下删除值，请使用`differenceBy`。

## 签名

```typescript
function pullAllBy<T>(arr: T[], values: T[], iteratee: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: Partial<T>): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: [keyof T, unknown]): T[];
function pullAllBy<T, K extends keyof T>(arr: T[], values: T[], iteratee: K): T[];
function pullAllBy<T>(arr: T[], values: T[], _iteratee: ((value: any) => any) | PropertyKey | object | null);
```

### 参数

- `arr` (`T[]`): 要修改的数组。
- `values` (`T[]`): 要从数组中删除的值。
- `_iteratee` (`((value: any) => any) | PropertyKey | object | null`): 为每个元素调用的迭代器。

### 返回值

(`T[]`): 删除指定值后的修改数组。
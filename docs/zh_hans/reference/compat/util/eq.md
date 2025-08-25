# eq

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

执行 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 比较，以确定两个值是否相等。

## 签名

```typescript
function eq(value?: unknown, other?: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要比较的值。
- `other` (`unknown`): 要比较的另一个值。

### 返回值

(`boolean`): 如果值相等，则返回 `true`，否则返回 `false`。

## 示例

```typescript
eq(1, 1); // true
eq(0, -0); // true
eq(NaN, NaN); // true
eq('a', Object('a')); // false
```

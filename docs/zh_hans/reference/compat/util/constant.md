# constant

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个总是返回 `value` 的新函数。

## 签名

```typescript
function constant(): () => undefined;
function constant<T>(value: T): () => T;
```

### 参数

- `value` (`T`): 从新函数返回的值。

### 返回值

(`() => T | undefined`): 新的常量函数。

## 示例

```typescript
const object = { a: 1 };
const returnsObject = constant(object);

returnsObject(); // => { a: 1 }
returnsObject() === object; // => true
```

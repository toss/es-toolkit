# defaultTo

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::
返回 `null`、`undefined` 和 `NaN` 的默认值。

## 签名

```typescript
function defaultTo<T>(value: T | null | undefined, defaultValue?: T): T;
function defaultTo(value?: unknown, defaultValue?: unknown): any;
```

### 参数

- `value` (`unknown`): 要检查的值。
- `defaultValue` (`unknown`): 如果值是 `null`、`undefined` 或 `NaN`，则返回的默认值。

### 返回值

(`unknown`): 第一个值或默认值。

## 示例

```typescript
defaultTo(null, 'default') // returns 'default'
defaultTo(undefined, 42) // returns 42
defaultTo(NaN, 0) // returns 0
defaultTo('actual', 'default') // returns 'actual'
defaultTo(123, 0) // returns 123
```
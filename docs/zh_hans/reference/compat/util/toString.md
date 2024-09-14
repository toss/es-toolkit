# toString

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将 `value` 转换为字符串。

对于 `null` 和 `undefined` 值，将返回空字符串。
`-0` 的符号将被保留。

## 签名

```typescript
function toString(value?: unknown): string;
```

### 参数

- `value` (`unknown`): 要转换的值。

### 返回值

(`string`): 返回转换后的字符串。

## 示例

```typescript
toString(null); // returns ''
toString(undefined); // returns ''
toString(-0); // returns '-0'
toString([1, 2, -0]); // returns '1,2,-0'
toString([Symbol('a'), Symbol('b')]); // returns 'Symbol(a),Symbol(b)'
```

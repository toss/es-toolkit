# repeat

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

返回给定字符串重复指定次数后的结果。

如果字符串为空或次数为 0，则返回空字符串。

## 签名

```typescript
function repeat(str: string, n: number): string
```

### 参数

- `str` (`string`): 要重复的字符串。
- `n` (`number`): 要重复的次数。

### 返回值

(`string`): 被重复 `n` 次后的字符串。

## 示例

```javascript
repeat('abc', 0); // ''
repeat('abc', 2); // 'abcabc'
```

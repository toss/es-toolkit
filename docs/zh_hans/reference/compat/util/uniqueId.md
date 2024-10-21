# toString

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

生成唯一的 ID。如果给出了前缀，则将 ID 附加到其上。

## 签名

```typescript
function uniqueId(value?: string): string;
```

### 参数

- `value` (`string`, optional): ID 的前缀值。

### 返回值

(`string`): 返回唯一 ID。

## 示例

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```

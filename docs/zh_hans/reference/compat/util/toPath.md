# toPath

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将深层键字符串转换为路径段数组。

此函数接受一个表示深层键的字符串（例如，`'a.b.c'` 或 `'a[b][c]'`），并将其分解为一个字符串数组，每个字符串表示路径的一段。

## 签名

```typescript
function toPath(deepKey: string): string[];
```

### 参数

- `deepKey` (`string`): 要转换的深层键字符串。

### 返回值

(`string[]`): 一个字符串数组，每个字符串表示路径的一段。

## 示例

```typescript
toPath('a.b.c'); // 返回 ['a', 'b', 'c']
toPath('a[b][c]'); // 返回 ['a', 'b', 'c']
toPath('.a.b.c'); // 返回 ['', 'a', 'b', 'c']
toPath('a["b.c"].d'); // 返回 ['a', 'b.c', 'd']
toPath(''); // 返回 []
toPath('.a[b].c.d[e]["f.g"].h'); // 返回 ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```

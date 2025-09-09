# toLower

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将给定的值转换为字符串并转换为小写。给定的输入首先会被转换为字符串。

## 签名

```typescript
function toLower<T extends string = string>(value?: T): Lowercase<T>;
```

### 参数

- `value` (`T`): 要转换的值。

### 返回值

(`Lowercase<T>`): 返回小写的字符串.

## 示例

```typescript
toLower('--FOO-BAR--');
// => '--foo-bar--'

toLower(null);
// => ''

toLower([1, 2, 3]);
// => '1,2,3'
```
